import { Category } from '../../../models/Category';
import { playlistTypes } from './playlist-types';
import { environment } from '../../../environment';
import { Song } from '../../../models/Song';

/*
CATEGORIES
 */

export const addPlaylistCategory = (category: Category) => (dispatch: any, getState: any) => {
    const playlistCategories = getState().playlist.newPlaylist.categories;
    if (category.name && playlistCategories.every((playlistCategory: Category) => category.name !== playlistCategory.name)) {
        dispatch({
            payload: {
                category
            },
            type: playlistTypes.ADD_PLAYLIST_CATEGORY
        })
    }
    return;
}

export const removePlaylistCategory = (category: Category) => (dispatch: any, getState: any) => {
    const categories = getState().playlist.newPlaylist.categories.filter((selectedCategory: Category) => selectedCategory.id !== category.id);
    dispatch({
        payload: {
            categories
        },
        type: playlistTypes.REMOVE_PLAYLIST_CATEGORY
    })
}

export const setCategories = (categories: Category[]) => {
    return {
        payload: {
            categories
        },
        type: playlistTypes.SET_CATEGORIES
    }
}

/*
SONGS
 */

export const addSelectedSong = (selectedSong: string) => (dispatch: any, getState: any) => {
    const name = selectedSong.split(' ').filter((word: string) => word !== 'by').join(' ');
    const url = `${environment.context}playlist/song-search`;
    fetch(url, {
        body: JSON.stringify({
            name
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(resp => resp.json())
        .then(resp => {
            const song = new Song({
                artistName: (resp.length && resp[0].artists.length) ? resp[0].artists[0].name : '',
                name: (resp.length) ? resp[0].name : '',
                spotifyArtistId: (resp.length && resp[0].artists.length) ? resp[0].artists[0].id : '',
                spotifyTrackId: (resp.length) ? resp[0].id : ''
            });
            // if the entered song is not a duplicate
            const newPlaylistSongs =getState().playlist.newPlaylist.songs;
            if (!newPlaylistSongs.some((newPlaylistSong: Song) => newPlaylistSong.spotifyTrackId === song.spotifyTrackId)) {
                // get suggested songs
                fetch(`${environment.context}playlist/recommendations`, {
                    body: JSON.stringify(song),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                })
                    .then(results => results.json())
                    .then(suggestedSongs => {
                        dispatch({
                            payload: {
                                song,
                                suggestedSongs
                            },
                            type: playlistTypes.ADD_SELECTED_SONG
                        })
                    })
            }
            else {
                // set an error message
            }
        })
        .catch(error => console.log(error))
}

export const addSongToNewPlaylist = (song: Song) => {
    return {
        payload: {
            song
        },
        type: playlistTypes.ADD_SONG_TO_NEW_PLAYLIST
    }
}

export const removeSongFromNewPlaylist = (songToRemove: Song) => (dispatch: any, getState: any) => {
    const newPlaylistSongs = getState().playlist.newPlaylist.songs.filter((song: Song) => song.spotifyTrackId !== songToRemove.spotifyTrackId);
    dispatch({
        payload: {
            newPlaylistSongs
        },
        type: playlistTypes.REMOVE_SONG_FROM_NEW_PLAYLIST
    })
}

export const removeSongFromSuggestedSongs = (songToRemove: Song) => (dispatch: any, getState: any) => {
    const suggestedSongs = getState().playlist.suggestedSongs.filter((song: Song) => song.spotifyTrackId !== songToRemove.spotifyTrackId);
    dispatch({
        payload: {
            suggestedSongs
        },
        type: playlistTypes.REMOVE_SONG_FROM_SUGGESTED_SONGS
    })
}