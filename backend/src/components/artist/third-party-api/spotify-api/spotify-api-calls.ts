import { Artist } from '../../../../models/Artist';
import { getAccessToken } from '../../../../util/access-token';
import fetch from 'node-fetch';
import { spotifyArtistConverter } from './converter';

export const searchForArtist = async (artist: Artist) => {
    const accessToken = await getAccessToken();
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(`${artist.artistName}`)}&type=artist&market=US`;
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
                return results.artists.items.map((spotifyArtist: any) => spotifyArtistConverter(spotifyArtist));
            }
            return [];
        })
        .catch(error => {
            console.log(error);
            return [];
        });
}