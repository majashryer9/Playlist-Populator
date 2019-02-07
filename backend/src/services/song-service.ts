import { Song } from '../models/Song';
import * as songDao from '../daos/song-dao';

export const getSimilarSongs = (songs: Song[]) => {
    return songDao.getSimilarSongs(songs);
}

export const saveSong = (song: Song) => {
    return songDao.saveSong(song);
}
