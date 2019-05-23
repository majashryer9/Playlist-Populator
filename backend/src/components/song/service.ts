import { Song } from '../../models/Song';
import * as songDao from './dao';

export const getFrequentlyOccurringSongsWithGivenSongs = async (songs: Song[]) => {
    const similarSongsNestedArray = await Promise.all(songs.map((song: Song) => songDao.getSimilarSongs([song])));
    // reduce nested array to one array containing all songs
    const similarSongs = similarSongsNestedArray.reduce((outerArray: Song[], innerArray: Song[]) => outerArray.concat(innerArray), []);
    const map = new Map<string, number>();
    // count up how frequently songs occur
    similarSongs.forEach((song: Song) => {
        const count = map.get(song.spotifyTrackId);
        const toAdd = (count) ? count + 1 : 1;
        map.set(song.spotifyTrackId, toAdd);
    });
    // order songs by most frequently occurring
    const orderedIds = [...map.keys()].sort((id1: string, id2: string) => (map.get(id2) || 0) - (map.get(id1) || 0));
    const topTwenty = (orderedIds.length > 20)? orderedIds.slice(0, 20) : orderedIds;
    const noDuplicateSongs = similarSongs.filter((song: Song) => {
        const index = topTwenty.indexOf(song.spotifyTrackId);
        if (index >= 0) {
            topTwenty.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    });
    return noDuplicateSongs;
}

export const getPlaylistSongs = (playlistId: number) => {
    return songDao.getPlaylistSongs(playlistId);
}

export const getSimilarSongs = (songs: Song[]) => {
    return songDao.getSimilarSongs(songs);
}

export const getSongIdBySpotifyTrackId = (spotifyTrackId: string) => {
    return songDao.getSongIdBySpotifyTrackId(spotifyTrackId);
}

export const saveSong = (song: Song) => {
    return songDao.saveSong(song);
}
