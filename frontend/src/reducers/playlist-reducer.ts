import { IPlaylistState } from '.';
import { Playlist } from '../models/Playlist';
import { playlistTypes } from '../components/actions/playlist/playlist-types';

const initialState: IPlaylistState = {
    categories: [],
    newPlaylist: new Playlist(),
    suggestedSongs: []
}

export const playlistReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case playlistTypes.ADD_PLAYLIST_CATEGORY:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    categories: [...state.newPlaylist.categories, action.payload.category]
                }
            }
        case playlistTypes.ADD_SELECTED_SONG:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    songs: [...state.newPlaylist.songs, action.payload.song]
                },
                suggestedSongs: action.payload.suggestedSongs
            }
        case playlistTypes.ADD_SONG_TO_NEW_PLAYLIST:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    songs: [...state.newPlaylist.songs, action.payload.song]
                }
            }
        case playlistTypes.REMOVE_PLAYLIST_CATEGORY:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    categories: action.payload.categories
                }
            }
        case playlistTypes.REMOVE_SONG_FROM_SUGGESTED_SONGS:
            return {
                ...state,
                suggestedSongs: action.payload.suggestedSongs
            }
        case playlistTypes.REMOVE_SONG_FROM_NEW_PLAYLIST:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    songs: action.payload.newPlaylistSongs
                }
            }
        case playlistTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload.categories
            }
    }
    return state;
}