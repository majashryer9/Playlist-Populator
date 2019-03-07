import { Song } from '../../models/Song';
import * as songDao from './dao';

export const getPlaylistSongs = (playlistId: number) => {
    return songDao.getPlaylistSongs(playlistId);
}

export const getSimilarSongs = async (songs: Song[]) => {
    const similarSongs = await songDao.getSimilarSongs(songs);
    if (similarSongs.length) {
        return similarSongs;
    }
    else {
        const moreSimilarSongsNestedArray = await Promise.all(songs.map((song: Song) => songDao.getSimilarSongs([song])));
        const moreSimilarSongs = moreSimilarSongsNestedArray.reduce((outerArray: Song[], innerArray: Song[]) => outerArray.concat(innerArray), []);
        const map = new Map<string, number>();
        moreSimilarSongs.forEach((song: Song) => {
            const count = map.get(song.spotifyTrackId);
            const toAdd = (count) ? count + 1 : 1;
            map.set(song.spotifyTrackId, toAdd);
        });
        const orderedIds = [...map.keys()].sort((id1: string, id2: string) => (map.get(id2) || 0) - (map.get(id1) || 0));
        const topTen = orderedIds.slice(0, 10);
        const noDuplicateSimilarSongs = moreSimilarSongs.filter((song: Song) => {
            const index = topTen.indexOf(song.spotifyTrackId);
            if (index >= 0) {
                topTen.splice(index, 1);
                return true;
            }
            else {
                return false;
            }
        });
        return noDuplicateSimilarSongs;
    }
}

export const getSongIdBySpotifyTrackId = (spotifyTrackId: string) => {
    return songDao.getSongIdBySpotifyTrackId(spotifyTrackId);
}

export const saveSong = (song: Song) => {
    return songDao.saveSong(song);
}
