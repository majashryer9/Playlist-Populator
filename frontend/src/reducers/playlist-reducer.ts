import { IPlaylistState } from '.';
import { Playlist } from '../models/Playlist';
import { playlistTypes } from '../components/actions/playlist/playlist-types';

const initialState: IPlaylistState = {
    newPlaylist: new Playlist(),
    suggestedSongs: []
}

export const playlistReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case playlistTypes.ADD_CATEGORY:
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
        case playlistTypes.REMOVE_CATEGORY:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    categories: action.payload.categories
                }
            }
    }
    return state;
}