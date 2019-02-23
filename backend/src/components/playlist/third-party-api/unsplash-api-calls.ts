import fetch from 'node-fetch';

const clientId = process.env.UNSPLASH_CLIENT_ID;
const baseUrl = `https://api.unsplash.com/`;

export const getUnsplashPhoto = () => {
    return fetch(`${baseUrl}photos/random/?client_id=${clientId}`)
    .then(results => results.json())
    .then(results => {
        if(results && !results.errors && results.urls) {
            return results.urls.thumb || results.urls.raw;
        }
        return '';
    })
    .catch(error => {
        console.log(error);
        return '';
    });
}