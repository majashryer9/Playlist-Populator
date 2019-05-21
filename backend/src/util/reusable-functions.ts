import { Playlist } from '../models/Playlist';

export const setIntersection = (arrays: Array<Playlist[]>) => {
    let n = 0;
    arrays.forEach((array: Playlist[]) => {
        if (array.length) {
            n = n + 1;
        }
    });
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