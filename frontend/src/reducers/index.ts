import { combineReducers } from 'redux';
import { homeReducer } from './home-reducer';
import { Playlist } from 'src/models/Playlist';
import { playlistReducer } from './playlist-reducer';
import { Song } from 'src/models/Song';
import { Category } from 'src/models/Category';
import { userReducer } from './user-reducer';

export interface IHomeState {
    variablePlaceholder: string;
}

export interface IPlaylistState {
    categories: Category[];
    mostRecentlyAddedSong: Song;
    newPlaylist: Playlist;
    suggestedSongs: Song[];
    uploadedImage: File | null;
}

export interface IUserState {
    username: string;
}

export interface IState {
    // register states here
    home: IHomeState;
    playlist: IPlaylistState;
    user: IUserState;
}

export const state = combineReducers<IState>({
    // register reducers here
    home: homeReducer,
    playlist: playlistReducer,
    user: userReducer
});