import { Song } from '../../models/Song';
import * as songDao from './dao';
import { Artist } from '../../models/Artist';
import { countMostFrequentlyOccuringSongs } from '../../util/reusable-functions';
import { Category } from '../../models/Category';

export const getFrequentlyOccurringSongsWithGivenArtists = async (artists: Artist[]) => {
    const nestedArrayOfSongs = await Promise.all(artists.map((artist: Artist) => songDao.getFrequentlyOccurringSongsWithGivenArtist(artist.spotifyArtistId)));
    // reduce nested array to one array containing all songs
    const songs = nestedArrayOfSongs.reduce((outerArray: Song[], innerArray: Song[]) => outerArray.concat(innerArray), []);
    return countMostFrequentlyOccuringSongs(songs);
}

export const getFrequentlyOccurringSongsWithGivenCategories = async (categories: Category[]) => {
    const nestedArrayOfSongs = await Promise.all(categories.map((category: Category) => songDao.getFrequentlyOccurringSongsWithGivenCategory(category.name)));
    // reduce nested array to one array containing all songs
    const songs = nestedArrayOfSongs.reduce((outerArray: Song[], innerArray: Song[]) => outerArray.concat(innerArray), []);
    return countMostFrequentlyOccuringSongs(songs);
}

export const getFrequentlyOccurringSongsWithGivenSongs = async (songs: Song[]) => {
    const similarSongsNestedArray = await Promise.all(songs.map((song: Song) => songDao.getSimilarSongs([song])));
    // reduce nested array to one array containing all songs
    const similarSongs = similarSongsNestedArray.reduce((outerArray: Song[], innerArray: Song[]) => outerArray.concat(innerArray), []);
    return countMostFrequentlyOccuringSongs(similarSongs);
}

export const getPlaylistSongs = (playlistId: number) => {
    return songDao.getPlaylistSongs(playlistId);
}

export const getSimilarSongs = (songs: Song[]) => {
    return songDao.getSimilarSongs(songs);
}

export const getSongIdBySpotifyTrackId = (spotifyTrackId: string) => {
    return songDao.getSongIdBySpotifyTrackId(spotifyTrackId);
}

export const saveSong = (song: Song) => {
    return songDao.saveSong(song);
}
