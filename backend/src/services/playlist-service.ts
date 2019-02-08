import { Playlist } from "../models/Playlist";
import { Category } from "../models/Category";
import { Song } from "../models/Song";
import * as categoryService from '../services/category-service';
import * as songService from '../services/song-service';
import * as playlistDao from '../daos/playlist-dao';

export const savePlaylist = async (playlist: Playlist) => {
    if (playlist.songs.length) {
        // save/retrieve all category ids
        playlist.categories = await Promise.all(playlist.categories.map(async (category: Category) => {
            let categoryId = await categoryService.saveCategory(category);
            category.id = (categoryId) ? categoryId : await categoryService.getCategoryIdByName(category.name);
            return category;
        }));
        // save/retrieve all song ids
        playlist.songs = await Promise.all(playlist.songs.map(async (song: Song) => {
            let songId = await songService.saveSong(song);
            song.id = (songId) ? songId : await songService.getSongIdBySpotifyTrackId(song.spotifyTrackId);
            return song;
        }));
        return playlistDao.savePlaylist(playlist);
    }
    return 0;
}