import { Playlist } from '../../models/Playlist';
import { Category } from '../../models/Category';
import { Song } from '../../models/Song';
import * as categoryService from '../category/service';
import * as songService from '../song/service';
import * as playlistDao from './dao';
import { putObjectSignedUrl } from '../../util/aws-s3';

export const getPlaylistsContainingSong = async (song: Song) => {
    const playlists = await playlistDao.getPlaylistsContainingSong(song);
    if (playlists.length) {
        return Promise.all(playlists.map(async (playlist: Playlist) => {
            // retrieve playlist categories
            const categories = await categoryService.getPlaylistCategories(playlist.id);
            playlist.categories = categories;
            //retrieve playlist songs
            const songs = await songService.getPlaylistSongs(playlist.id);
            playlist.songs = songs;
            return playlist;
        }));
    }
    return [];
}

export const savePlaylist = async (playlist: Playlist) => {
    if (playlist.songs.length) {
        // retrieve/save all category ids
        playlist.categories = await Promise.all(playlist.categories.map(async (category: Category) => {
            const categoryId = await categoryService.getCategoryIdByName(category.name);
            category.id = (categoryId) ? categoryId : await categoryService.saveCategory(category);
            return category;
        }));
        // retrieve/save all song ids
        playlist.songs = await Promise.all(playlist.songs.map(async (song: Song) => {
            const songId = await songService.getSongIdBySpotifyTrackId(song.spotifyTrackId);
            song.id = (songId) ? songId : await songService.saveSong(song);
            return song;
        }));
        const playlistId = await playlistDao.savePlaylist(playlist);
        const signedUrl = (playlist.bucketKey) ? putObjectSignedUrl(playlist.bucketKey) : '';
        return { playlistId, signedUrl };
    }
    return { playlistId: 0, signedUrl: '' };
}