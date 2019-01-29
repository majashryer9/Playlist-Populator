import { combineReducers } from 'redux';
import { homeReducer } from './home-reducer';
import { Playlist } from '../models/Playlist';
import { playlistReducer } from './playlist-reducer';
import { Song } from '../models/Song';

export interface IHomeState {
    variablePlaceholder: string;
}

export interface IPlaylistState {
    newPlaylist: Playlist;
    suggestedSongs: Song[];
}

export interface IState {
    // register states here
    home: IHomeState;
    playlist: IPlaylistState;
}

export const state = combineReducers<IState>({
    // register reducers here
    home: homeReducer,
    playlist: playlistReducer
});