import { IPlaylistState } from '.';
import { Playlist } from '../models/Playlist';
import { playlistTypes } from '../components/actions/playlist/playlist-types';

const initialState: IPlaylistState = {
    categories: [],
    newPlaylist: new Playlist(),
    suggestedSongs: []
}

export const playlistReducer = (state = initialState, action: any) => {
    switch(action.type) {
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
        case playlistTypes.REMOVE_PLAYLIST_CATEGORY:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    categories: action.payload.categories
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