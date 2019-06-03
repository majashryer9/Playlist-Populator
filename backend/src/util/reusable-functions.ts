import { Playlist } from '../models/Playlist';
import { Song } from '../models/Song';

export const countMostFrequentlyOccuringSongs = (songs: Song[]) => {
    const map = new Map<string, number>();
    // count up how frequently songs occur
    songs.forEach((song: Song) => {
        const count = map.get(song.spotifyTrackId);
        const toAdd = (count) ? count + 1 : 1;
        map.set(song.spotifyTrackId, toAdd);
    });
    // order songs by most frequently occurring
    const orderedIds = [...map.keys()].sort((id1: string, id2: string) => (map.get(id2) || 0) - (map.get(id1) || 0));
    const topTwenty = (orderedIds.length > 20) ? orderedIds.slice(0, 20) : orderedIds;
    const noDuplicateSongs = songs.filter((song: Song) => {
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

export const setIntersection = (arrays: Array<Playlist[]>) => {
    const n = arrays.length;
    const map = new Map<number, number>();
    const playlists: Playlist[] = [];
    arrays.forEach((arr: Playlist[]) => {
        arr.forEach((playlist: Playlist) => {
            if (!playlists.some((alreadyPushedPlaylist: Playlist) => alreadyPushedPlaylist.id === playlist.id)) {
                playlists.push(playlist);
            }
            const numOccurrencesOfId = map.get(playlist.id);
            map.set(playlist.id,
                (numOccurrencesOfId) ?
                    numOccurrencesOfId + 1
                    :
                    1
            );
        });
    });
    const ids = [...map.keys()].filter((id: number) => map.get(id) === n);
    return playlists.filter((playlist: Playlist) => ids.some((id: number) => id === playlist.id));
}