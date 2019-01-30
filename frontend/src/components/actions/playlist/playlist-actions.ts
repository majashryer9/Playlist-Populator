import { Category } from '../../../models/Category';
import { playlistTypes } from './playlist-types';
import { environment } from '../../../environment';
import { Song } from '../../../models/Song';

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

export const addSelectedSong = (selectedSong: string) => (dispatch: any) => {
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
        })
        .catch(error => console.log(error))
}