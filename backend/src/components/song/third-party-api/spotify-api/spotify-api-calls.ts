import { Song } from '../../../../models/Song';
import { getAccessToken } from '../../../../util/access-token';
import fetch from 'node-fetch';
import { spotifySongConverter } from './converter';

export const getArtistsTopSongs = async (spotifyArtistId: string) => {
    const accessToken = await getAccessToken();
    const url = `https://api.spotify.com/v1/artists/${spotifyArtistId}/top-tracks?country=US`;
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(results => results.json())
        .then(results => {
            if (results && !results.error) {
                return results.tracks.map((spotifySong: any) => spotifySongConverter(spotifySong));
            }
            return [];
        })
        .catch(error => {
            console.log(error);
            return [];
        });
}

export const getSpotifyRecommendations = async (songs: Song[]) => {
    const accessToken = await getAccessToken();
    const url = `https://api.spotify.com/v1/recommendations?limit=15&market=US&seed_tracks=${encodeURIComponent(songs.map((song: Song) => song.spotifyTrackId).join())}`;
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(results => results.json())
        .then(results => {
            if (!results) throw new Error();
            if (results.error) throw new Error();
            return results.tracks.map((spotifySong: any) => spotifySongConverter(spotifySong));
        })
        .catch((err: Error) => {
            throw err;
        });
}

export const searchForSong = async (song: Song) => {
    const accessToken = await getAccessToken();
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(`${song.name}`)}&type=track&market=US`;
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(results => results.json())
        .then(results => {
            if (results && !results.error) {
                return results.tracks.items.map((spotifySong: any) => spotifySongConverter(spotifySong));
            }
            return [];
        })
        .catch(error => {
            console.log(error);
            return [];
        });
}
