import { combineReducers } from 'redux';
import { homeReducer } from './home-reducer';
import { Playlist } from 'src/models/Playlist';
import { playlistReducer } from './playlist-reducer';
import { Song } from 'src/models/Song';
import { Category } from 'src/models/Category';
import { userReducer } from './user-reducer';
import { Artist } from 'src/models/Artist';

export interface IHomeState {
    variablePlaceholder: string;
}

export interface IPlaylistState {
    artistsForSearch: Artist[];
    categories: Category[];
    categoriesForSearch: Category[];
    curRef: any;
    getNewImages: boolean;
    mostRecentlyAddedSong: Song;
    newPlaylist: Playlist;
    playing: boolean;
    populated: boolean;
    songsForSearch: Song[];
    suggestedSongs: Song[];
    timeout: any;
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