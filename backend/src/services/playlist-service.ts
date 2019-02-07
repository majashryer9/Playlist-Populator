import { Playlist } from "../models/Playlist";
import { Category } from "../models/Category";
import { Song } from "../models/Song";
import * as categoryDao from '../daos/category-dao';
import * as songDao from '../daos/song-dao';
import * as playlistDao from '../daos/playlist-dao';

export const savePlaylist = async (playlist: Playlist) => {
    // save/retrieve all category ids
    playlist.categories = await Promise.all(playlist.categories.map(async (category: Category) => {
        let categoryId = await categoryDao.saveCategory(category);
        category.id = (categoryId)? categoryId : await categoryDao.getCategoryIdByName(category.name);
        return category;
    }));
    // save/retrieve all song ids
    playlist.songs = await Promise.all(playlist.songs.map(async (song: Song) => {
        let songId = await songDao.saveSong(song);
        song.id = (songId)? songId : await songDao.getSongIdBySpotifyTrackId(song.spotifyTrackId);
        return song;
    }));
    return playlistDao.savePlaylist(playlist);
}