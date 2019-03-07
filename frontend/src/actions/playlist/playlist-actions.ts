import { playlistTypes } from './playlist-types';
import { environment } from 'src/environment';
import { Category } from 'src/models/Category';
import { Playlist } from 'src/models/Playlist';
import { Song } from 'src/models/Song';

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

export const clearUnsplashImageUrl = () => {
    return {
        payload: {
            unsplashImageUrl: ''
        },
        type: playlistTypes.CLEAR_UNSPLASH_IMAGE_URL
    }
}

export const clearUploadedImage = () => {
    return {
        payload: {
            uploadedImage: null
        },
        type: playlistTypes.CLEAR_UPLOADED_IMAGE
    }
}

export const discardNewPlaylist = () => {
    return {
        payload: {
            newPlaylist: new Playlist()
        },
        type: playlistTypes.DISCARD_NEW_PLAYLIST
    }
}

export const savePlaylist = (playlist: Playlist) => (dispatch: any, getState: any) => {
    const url = `${environment.context}playlist/save-playlist`;
    const uploadedImage = getState().playlist.uploadedImage;
    if (uploadedImage) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let bucketKey = '';
        for (let i = 0; i < 20; i++) {
            bucketKey += chars[Math.floor(Math.random() * chars.length)]
        }
        playlist.bucketKey = bucketKey;
    }
    fetch(url, {
        body: JSON.stringify(playlist),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(resp => resp.json())
        .then(playlistIdAndSignedUrl => {
            const playlistId = playlistIdAndSignedUrl.playlistId;
            dispatch({
                payload: {
                    playlistId
                },
                type: playlistTypes.SAVE_PLAYLIST
            })
            if (playlistIdAndSignedUrl.signedUrl && uploadedImage) {
                fetch(playlistIdAndSignedUrl.signedUrl, {
                    body: JSON.stringify(uploadedImage),
                    method: 'PUT'
                })
                    .then(resp => console.log(resp))
                    .catch(error => console.log(error));
            }
        })
        .catch(error => console.log(error));
}

export const setUnsplashImageUrl = (unsplashImageUrl: string) => {
    return {
        payload: {
            unsplashImageUrl
        },
        type: playlistTypes.SET_UNSPLASH_IMAGE_URL
    }
}

export const setUploadedImage = (uploadedImage: File) => {
    return {
        payload: {
            uploadedImage
        },
        type: playlistTypes.SET_UPLOADED_IMAGE
    }
}

/*
SONGS
 */

export const addSelectedSong = (selectedSong: Song) => (dispatch: any, getState: any) => {
    const currentNewPlaylistSongs = getState().playlist.newPlaylist.songs;
    // only proceed if selected song isn't already in the playlist
    if (!currentNewPlaylistSongs.some((newPlaylistSong: Song) => newPlaylistSong.spotifyTrackId === selectedSong.spotifyTrackId)) {
        fetch(`${environment.context}song/recommendations`, {
            body: JSON.stringify([selectedSong]),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(results => results.json())
            .then(unfilteredSuggestedSongs => {
                // filter any suggestedSongs that are already in the playlist or that are the selected song
                const newPlaylistSongs = [selectedSong, ...currentNewPlaylistSongs];
                const suggestedSongs = unfilteredSuggestedSongs.filter((suggestedSong: Song) => {
                    return !newPlaylistSongs.some((newPlaylistSong: Song) =>
                        suggestedSong.spotifyTrackId === newPlaylistSong.spotifyTrackId)
                });
                if (suggestedSongs && suggestedSongs.length) {
                    dispatch({
                        payload: {
                            selectedSong,
                            suggestedSongs
                        },
                        type: playlistTypes.ADD_SELECTED_SONG
                    })
                }
            })
            .catch(error => console.log(error));
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
        .catch(error => console.log(error));
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
        .catch(error => console.log(error));
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

export const setMostRecentlyAddedSong = (mostRecentlyAddedSong: Song) => {
    return {
        payload: {
            mostRecentlyAddedSong
        },
        type: playlistTypes.SET_MOST_RECENTLY_ADDED_SONG
    }
}