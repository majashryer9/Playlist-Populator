import { IPlaylistState } from '.';
import { Playlist } from 'src/models/Playlist';
import { playlistTypes } from 'src/actions/playlist/playlist-types';
import { Song } from 'src/models/Song';

const initialState: IPlaylistState = {
    advancedSearchResults: [],
    artistsForSearch: [],
    categories: [],
    categoriesForSearch: [],
    curRef: null,
    getNewImages: false,
    mostRecentlyAddedSong: new Song(),
    newPlaylist: new Playlist(),
    playing: false,
    populated: false,
    songsForSearch: [],
    suggestedSongs: [],
    timeout: null,
    uploadedImage: null
}

export const playlistReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case playlistTypes.ADD_ARTIST_FOR_SEARCH:
            return {
                ...state,
                artistsForSearch: [...state.artistsForSearch, action.payload.artistForSearch]
            }
        case playlistTypes.ADD_CATEGORY_FOR_SEARCH:
            return {
                ...state,
                categoriesForSearch: [...state.categoriesForSearch, action.payload.categoryForSearch]
            }
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
                    songs: [...state.newPlaylist.songs, action.payload.selectedSong]
                },
                suggestedSongs: action.payload.suggestedSongs
            }
        case playlistTypes.ADD_SONG_FOR_SEARCH:
            return {
                ...state,
                songsForSearch: [...state.songsForSearch, action.payload.songForSearch]
            }
        case playlistTypes.ADD_SONG_TO_NEW_PLAYLIST:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    songs: [...state.newPlaylist.songs, action.payload.song]
                }
            }
        case playlistTypes.ADD_SONG_TO_SUGGESTED_SONGS:
            return {
                ...state,
                suggestedSongs: [action.payload.song, ...state.suggestedSongs]
            }
        case playlistTypes.ADVANCED_SEARCH:
            return {
                ...state,
                advancedSearchResults: action.payload.advancedSearchResults
            }
        case playlistTypes.CLEAR_MOST_RECENTLY_ADDED_SONG:
            return {
                ...state,
                mostRecentlyAddedSong: action.payload.mostRecentlyAddedSong
            }
        case playlistTypes.CLEAR_PLAYLIST:
            return {
                ...state,
                newPlaylist: action.payload.newPlaylist
            }
        case playlistTypes.CLEAR_PLAYLIST_SONGS:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    songs: action.payload.songs
                }
            }
        case playlistTypes.CLEAR_SUGGESTED_SONGS:
            return {
                ...state,
                suggestedSongs: action.payload.suggestedSongs
            }
        case playlistTypes.CLEAR_UNSPLASH_IMAGE_URL:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    unsplashImageUrl: action.payload.unsplashImageUrl
                }
            }
        case playlistTypes.CLEAR_UPLOADED_IMAGE:
            return {
                ...state,
                uploadedImage: action.payload.uploadedImage
            }
        case playlistTypes.GET_SIMILAR_SONGS:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    songs: action.payload.songsWithNoDuplicates
                }
            }
        case playlistTypes.GET_SPOTIFY_RECOMMENDATIONS:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    songs: action.payload.songsWithNoDuplicates
                }
            }
        case playlistTypes.REMOVE_ARTIST_FOR_SEARCH:
            return {
                ...state,
                artistsForSearch: action.payload.artistsForSearch
            }
        case playlistTypes.REMOVE_CATEGORY_FOR_SEARCH:
            return {
                ...state,
                categoriesForSearch: action.payload.categoriesForSearch
            }
        case playlistTypes.REMOVE_PLAYLIST_CATEGORY:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    categories: action.payload.categories
                }
            }
        case playlistTypes.REMOVE_SONG_FOR_SEARCH:
            return {
                ...state,
                songsForSearch: action.payload.songsForSearch
            }
        case playlistTypes.REMOVE_SONG_FROM_NEW_PLAYLIST:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    songs: action.payload.newPlaylistSongs
                }
            }
        case playlistTypes.REMOVE_SONG_FROM_SUGGESTED_SONGS:
            return {
                ...state,
                suggestedSongs: action.payload.suggestedSongs
            }
        case playlistTypes.SAVE_PLAYLIST:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    id: action.payload.playlistId
                }
            }
        case playlistTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload.categories
            }
        case playlistTypes.SET_CUR_REF:
            return {
                ...state,
                curRef: action.payload.curRef
            }
        case playlistTypes.SET_GET_NEW_IMAGES:
            return {
                ...state,
                getNewImages: action.payload.getNewImages
            }
        case playlistTypes.SET_MOST_RECENTLY_ADDED_SONG:
            return {
                ...state,
                mostRecentlyAddedSong: action.payload.mostRecentlyAddedSong
            }
        case playlistTypes.SET_PLAYING:
            return {
                ...state,
                playing: action.payload.playing
            }
        case playlistTypes.SET_POPULATED:
            return {
                ...state,
                populated: action.payload.populated
            }
        case playlistTypes.SET_PLAYLIST_DESCRIPTION:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    description: action.payload.description
                }
            }
        case playlistTypes.SET_PLAYLIST_NAME:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    name: action.payload.name
                }
            }
        case playlistTypes.SET_NEW_TIMEOUT:
            return {
                ...state,
                timeout: action.payload.timeout
            }
        case playlistTypes.SET_UNSPLASH_IMAGE_URL:
            return {
                ...state,
                newPlaylist: {
                    ...state.newPlaylist,
                    unsplashImageUrl: action.payload.unsplashImageUrl
                }
            }
        case playlistTypes.SET_UPLOADED_IMAGE:
            return {
                ...state,
                uploadedImage: action.payload.uploadedImage
            }
    }
    return state;
}