import { Category } from '../../../../models/Category';
import { getAccessToken } from '../../../../util/access-token';
import fetch from 'node-fetch';
import { spotifyCategoryConverter } from './converter';

export const getCategories = async () => {
    const accessToken = await getAccessToken();
    const url = `https://api.spotify.com/v1/browse/categories?country=US`;
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
                return results.categories.items.map((spotifyCategory: any) => spotifyCategoryConverter(spotifyCategory));
            }
            return [];
        })
        .catch(error => {
            console.log(error);
            return [];
        });
}