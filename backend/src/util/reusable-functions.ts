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
    const mapKeys = [...map.keys()];
    // order songs by most frequently occurring
    const idsOfSongsOccurringMoreThanOnce = mapKeys.filter((spotifyTrackId: string) => (map.get(spotifyTrackId) || 0) > 1);
    const idsOfSongsOnlyOccurringOnce = mapKeys.filter((spotifyTrackId: string) => (map.get(spotifyTrackId) || 0) === 1);
    const orderedIds = idsOfSongsOccurringMoreThanOnce.sort((id1: string, id2: string) => (map.get(id2) || 0) - (map.get(id1) || 0));
    const numSongsNeededToGetTo20 = 20 - orderedIds.length;
    let random: string[] = [];
    if (idsOfSongsOnlyOccurringOnce.length <= numSongsNeededToGetTo20) {
        random.push(...idsOfSongsOnlyOccurringOnce);
    }
    else {
        for (let i = 0; i < numSongsNeededToGetTo20; i++) {
            random.push(idsOfSongsOnlyOccurringOnce[Math.floor(Math.random() * idsOfSongsOnlyOccurringOnce.length)])
        }
    }
    const topTwenty = (numSongsNeededToGetTo20 <= 0) ? orderedIds.slice(0, 20) : orderedIds.concat(random);
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