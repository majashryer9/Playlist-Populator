import { Category } from '../../../models/Category';
import { playlistTypes } from './playlist-types';
import { environment } from '../../../environment';
import { Song } from '../../../models/Song';
import { Playlist } from '../../../models/Playlist';

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
PLAYLISTS
*/

export const savePlaylist = (playlist: Playlist) => (dispatch: any) => {
    const url = `${environment.context}playlist/save-playlist`;
    fetch(url, {
        body: JSON.stringify(playlist),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(resp => resp.json())
        .then(playlistId => {
            dispatch({
                payload: {
                    playlistId
                },
                type: playlistTypes.SAVE_PLAYLIST
            })
        })
        .catch(error => console.log(error));

}

/*
SONGS
 */

export const addSelectedSong = (selectedSong: Song) => (dispatch: any, getState: any) => {
    const newPlaylistSongs = getState().playlist.newPlaylist.songs;
    // only proceed if selected song isn't already in the playlist
    if (!newPlaylistSongs.some((newPlaylistSong: Song) => newPlaylistSong.spotifyTrackId === selectedSong.spotifyTrackId)) {
        fetch(`${environment.context}song/recommendations`, {
            body: JSON.stringify([selectedSong]),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(results => results.json())
            .then(suggestedSongs => {
                dispatch({
                    payload: {
                        selectedSong,
                        suggestedSongs
                    },
                    type: playlistTypes.ADD_SELECTED_SONG
                })
            })
    }
}

export const addSongToNewPlaylist = (song: Song) => {
    return {
        payload: {
            song
        },
        type: playlistTypes.ADD_SONG_TO_NEW_PLAYLIST
    }
}

export const getSimilarSongs = (songs: Song[]) => (dispatch: any, getState: any) => {
    const url = `${environment.context}song/similar-songs`;
    fetch(url, {
        body: JSON.stringify(songs),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(resp => resp.json())
        .then(similarSongs => {
            // remove duplicate songs
            const allSongs = [...getState().playlist.newPlaylist.songs, ...similarSongs];
            const idsWithNoDuplicates = new Set(allSongs.map((song: Song) => song.spotifyTrackId));
            const songsWithNoDuplicates = allSongs.filter((song: Song) => {
                if (idsWithNoDuplicates.has(song.spotifyTrackId)) {
                    idsWithNoDuplicates.delete(song.spotifyTrackId);
                    return true;
                }
                return false;
            })
            dispatch({
                payload: {
                    songsWithNoDuplicates
                },
                type: playlistTypes.GET_SIMILAR_SONGS
            })
        })
}

export const getSpotifyRecommendations = (songs: Song[]) => (dispatch: any, getState: any) => {
    const url = `${environment.context}song/recommendations`;
    fetch(url, {
        body: JSON.stringify(songs),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(resp => resp.json())
        .then(recommendations => {
            // remove duplicate songs
            const allSongs = [...getState().playlist.newPlaylist.songs, ...recommendations];
            const idsWithNoDuplicates = new Set(allSongs.map((song: Song) => song.spotifyTrackId));
            const songsWithNoDuplicates = allSongs.filter((song: Song) => {
                if (idsWithNoDuplicates.has(song.spotifyTrackId)) {
                    idsWithNoDuplicates.delete(song.spotifyTrackId);
                    return true;
                }
                return false;
            })
            dispatch({
                payload: {
                    songsWithNoDuplicates
                },
                type: playlistTypes.GET_SPOTIFY_RECOMMENDATIONS
            })
        })
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