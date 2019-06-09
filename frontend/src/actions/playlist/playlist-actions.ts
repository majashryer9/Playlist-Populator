import { playlistTypes } from './playlist-types';
import { environment } from '../../environment';
import { Category } from '../../models/Category';
import { Song } from '../../models/Song';
import { Playlist } from 'src/models/Playlist';
import { Artist } from 'src/models/Artist';

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

export const addArtistForSearch = (artistForSearch: Artist) => {
    return {
        payload: {
            artistForSearch
        },
        type: playlistTypes.ADD_ARTIST_FOR_SEARCH
    }
}

export const addCategoryForSearch = (categoryForSearch: Category) => {
    return {
        payload: {
            categoryForSearch
        },
        type: playlistTypes.ADD_CATEGORY_FOR_SEARCH
    }
}

export const addSongForSearch = (songForSearch: Song) => {
    return {
        payload: {
            songForSearch
        },
        type: playlistTypes.ADD_SONG_FOR_SEARCH
    }
}

export const advancedSearch = (spotifyTrackIds: string[], spotifyArtistIds: string[], categoryNames: string[]) => (dispatch: any) => {
    const url = `${environment.context}playlist/advanced-search`;
    fetch(url, {
        body: JSON.stringify({
            categoryNames,
            spotifyArtistIds,
            spotifyTrackIds
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(resp => resp.json())
        .then(advancedSearchResults => {
            dispatch({
                payload: {
                    advancedSearchResults
                },
                type: playlistTypes.ADVANCED_SEARCH
            })
        });
}

export const clearMostRecentlyAddedSong = () => {
    return {
        payload: {
            mostRecentlyAddedSong: new Song()
        },
        type: playlistTypes.CLEAR_MOST_RECENTLY_ADDED_SONG
    }
}

export const clearPlaylist = () => {
    return {
        payload: {
            newPlaylist: new Playlist()
        },
        type: playlistTypes.CLEAR_PLAYLIST
    }
}

export const clearPlaylistSongs = () => {
    return {
        payload: {
            songs: []
        },
        type: playlistTypes.CLEAR_PLAYLIST_SONGS
    }
}

export const clearSuggestedSongs = () => {
    return {
        payload: {
            suggestedSongs: []
        },
        type: playlistTypes.CLEAR_SUGGESTED_SONGS
    }
}

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

export const removeArtistForSearch = (spotifyArtistId: string) => (dispatch: any, getState: any) => {
    const artistsForSearch = getState().playlist.artistsForSearch.filter((artistForSearch: Artist) => artistForSearch.spotifyArtistId !== spotifyArtistId);
    dispatch({
        payload: {
            artistsForSearch
        },
        type: playlistTypes.REMOVE_ARTIST_FOR_SEARCH
    })
}

export const removeCategoryForSearch = (categoryName: string) => (dispatch: any, getState: any) => {
    const categoriesForSearch = getState().playlist.categoriesForSearch.filter((categoryForSearch: Category) => categoryForSearch.name !== categoryName);
    dispatch({
        payload: {
            categoriesForSearch
        },
        type: playlistTypes.REMOVE_CATEGORY_FOR_SEARCH
    })
}

export const removeSongForSearch = (spotifyTrackId: string) => (dispatch: any, getState: any) => {
    const songsForSearch = getState().playlist.songsForSearch.filter((songForSearch: Song) => songForSearch.spotifyTrackId !== spotifyTrackId);
    dispatch({
        payload: {
            songsForSearch
        },
        type: playlistTypes.REMOVE_SONG_FOR_SEARCH
    })
}

export const savePlaylist = (saved: boolean, playlistToSave?: Playlist) => (dispatch: any, getState: any) => {
    const url = `${environment.context}playlist/save-playlist`;
    const playlist = (playlistToSave) ? playlistToSave : getState().playlist.newPlaylist;
    playlist.saved = saved;
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

export const setGetNewImages = (getNewImages: boolean) => {
    return {
        payload: {
            getNewImages
        },
        type: playlistTypes.SET_GET_NEW_IMAGES
    }
}

export const setPlaylistDescription = (description: string) => {
    return {
        payload: {
            description
        },
        type: playlistTypes.SET_PLAYLIST_DESCRIPTION
    }
}

export const setPlaylistName = (name: string) => {
    return {
        payload: {
            name
        },
        type: playlistTypes.SET_PLAYLIST_NAME
    }
}

export const setPopulated = (populated: boolean) => {
    return {
        payload: {
            populated
        },
        type: playlistTypes.SET_POPULATED
    }
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

export const addArtistForMostFrequentSongsSearch = (artist: Artist) => (dispatch: any, getState: any) => {
    const artistsForMostFrequentSongsSearch = getState().playlist.artistsForMostFrequentSongsSearch;
    if (!artistsForMostFrequentSongsSearch.some((alreadyAddedArtist: Artist) => artist.spotifyArtistId === alreadyAddedArtist.spotifyArtistId)) {
        dispatch({
            payload: {
                artistForMostFrequentSongsSearch: artist
            },
            type: playlistTypes.ADD_ARTIST_FOR_MOST_FREQUENT_SONGS_SEARCH
        })
    }
}

export const addCategoryForMostFrequentSongsSearch = (category: Category) => {
    return {
        payload: {
            categoryForMostFrequentSongsSearch: category
        },
        type: playlistTypes.ADD_CATEGORY_FOR_MOST_FREQUENT_SONGS_SEARCH
    }
}

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

export const addSongForMostFrequentSongsSearch = (song: Song) => {
    return {
        payload: {
            song
        },
        type: playlistTypes.ADD_SONG_FOR_MOST_FREQUENT_SONGS_SEARCH
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

export const addSongToSuggestedSongs = (song: Song) => {
    return {
        payload: {
            song
        },
        type: playlistTypes.ADD_SONG_TO_SUGGESTED_SONGS
    }
}

export const getFrequentlyOccurringSongsWithGivenArtists = () => (dispatch: any, getState: any) => {
    const url = `${environment.context}song/frequently-occurring-songs-with-artists`;
    const artistsForMostFrequentSongsSearch = getState().playlist.artistsForMostFrequentSongsSearch;
    fetch(url, {
        body: JSON.stringify({
            artists: artistsForMostFrequentSongsSearch
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(resp => resp.json())
        .then(mostFrequentSongsWithGivenArtistsSearchResults => {
            dispatch({
                payload: {
                    mostFrequentSongsWithGivenArtistsSearchResults
                },
                type: playlistTypes.SET_MOST_FREQUENT_SONGS_WITH_GIVEN_ARTISTS_SEARCH_RESULTS
            })
        });
}

export const getFrequentlyOccurringSongsWithGivenCategories = () => (dispatch: any, getState: any) => {
    const url = `${environment.context}song/frequently-occurring-songs-with-categories`;
    const categoriesForMostFrequentSongsSearch = getState().playlist.categoriesForMostFrequentSongsSearch;
    fetch(url, {
        body: JSON.stringify({
            categories: categoriesForMostFrequentSongsSearch
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
    .then(resp => resp.json())
    .then(mostFrequentSongsWithGivenCategoriesSearchResults => {
        dispatch({
            payload: {
                mostFrequentSongsWithGivenCategoriesSearchResults
            },
            type: playlistTypes.SET_MOST_FREQUENT_SONGS_WITH_GIVEN_CATEGORIES_SEARCH_RESULTS
        })
    });
}

export const getFrequentlyOccurringSongsWithGivenSongs = () => (dispatch: any, getState: any) => {
    const url = `${environment.context}song/frequently-occurring-songs-with-songs`;
    const songsForMostFrequentSongsSearch = getState().playlist.songsForMostFrequentSongsSearch;
    fetch(url, {
        body: JSON.stringify({
            songs: songsForMostFrequentSongsSearch
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(resp => resp.json())
        .then(mostFrequentSongsSearchResults => {
            dispatch({
                payload: {
                    mostFrequentSongsSearchResults
                },
                type: playlistTypes.SET_MOST_FREQUENT_SONGS_SEARCH_RESULTS
            })
        });
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
            });
            dispatch(savePlaylist(false,
                new Playlist({
                    categories: getState().playlist.newPlaylist.categories,
                    songs: recommendations
                })
            ));
            dispatch({
                payload: {
                    songsWithNoDuplicates
                },
                type: playlistTypes.GET_SPOTIFY_RECOMMENDATIONS
            })
        })
        .catch(error => console.log(error));
}

export const removeArtistForMostFrequentSongsSearch = (spotifyArtistId: string) => (dispatch: any, getState: any) => {
    const artistsForMostFrequentSongsSearch = getState().playlist.artistsForMostFrequentSongsSearch.filter((artist: Artist) => artist.spotifyArtistId !== spotifyArtistId);
    dispatch({
        payload: {
            artistsForMostFrequentSongsSearch
        },
        type: playlistTypes.REMOVE_ARTIST_FOR_MOST_FREQUENT_SONGS_SEARCH
    })
}

export const removeCategoryForMostFrequentSongsSearch = (categoryName: string) => (dispatch: any, getState: any) => {
    const categoriesForMostFrequentSongsSearch = getState().playlist.categoriesForMostFrequentSongsSearch.filter((alreadyAddedCategory: Category) => alreadyAddedCategory.name !== categoryName);
    dispatch({
        payload: {
            categoriesForMostFrequentSongsSearch
        },
        type: playlistTypes.REMOVE_CATEGORY_FOR_MOST_FREQUENT_SONGS_SEARCH
    })
}

export const removeSongForMostFrequentSongsSearch = (spotifyTrackId: string) => (dispatch: any, getState: any) => {
    const songsForMostFrequentSongsSearch = getState().playlist.songsForMostFrequentSongsSearch.filter((song: Song) => spotifyTrackId !== song.spotifyTrackId);
    dispatch({
        payload: {
            songsForMostFrequentSongsSearch
        },
        type: playlistTypes.REMOVE_SONG_FOR_MOST_FREQUENT_SONGS_SEARCH
    })
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

export const setCurRef = (curRef: any) => {
    return {
        payload: {
            curRef
        },
        type: playlistTypes.SET_CUR_REF
    }
}

export const setMostRecentlyAddedSong = (mostRecentlyAddedSong: Song) => {
    return {
        payload: {
            mostRecentlyAddedSong
        },
        type: playlistTypes.SET_MOST_RECENTLY_ADDED_SONG
    }
}

export const setNewTimeout = (timeout: any) => {
    return {
        payload: {
            timeout
        },
        type: playlistTypes.SET_NEW_TIMEOUT
    }
}

export const setPlaying = (playing: boolean) => {
    return {
        payload: {
            playing
        },
        type: playlistTypes.SET_PLAYING
    }
}