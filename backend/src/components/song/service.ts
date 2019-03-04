import { Song } from '../../models/Song';
import * as songDao from './dao';

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
