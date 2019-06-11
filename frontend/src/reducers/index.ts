import { combineReducers } from 'redux';
import { homeReducer } from './home-reducer';
import { Playlist } from 'src/models/Playlist';
import { playlistReducer } from './playlist-reducer';
import { Song } from 'src/models/Song';
import { Category } from 'src/models/Category';
import { userReducer } from './user-reducer';
import { Artist } from 'src/models/Artist';
import { User } from 'src/models/User';

export interface IHomeState {
    variablePlaceholder: string;
}

export interface IPlaylistState {
    advancedSearchResults: Playlist[];
    artistsForMostFrequentSongsSearch: Artist[];
    artistsForSearch: Artist[];
    categories: Category[];
    categoriesForMostFrequentSongsSearch: Category[];
    categoriesForSearch: Category[];
    curRef: any;
    getNewImages: boolean;
    mostFrequentSongsSearchResults: Song[];
    mostFrequentSongsWithGivenArtistsSearchResults: Song[];
    mostFrequentSongsWithGivenCategoriesSearchResults: Song[];
    mostRecentlyAddedSong: Song;
    newPlaylist: Playlist;
    playing: boolean;
    populated: boolean;
    songsForMostFrequentSongsSearch: Song[];
    songsForSearch: Song[];
    suggestedSongs: Song[];
    timeout: any;
    uploadedImage: File | null;
    userId: number;
}

export interface IUserState {
    loggedInUser: User;
    loggingInToSave: boolean;
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