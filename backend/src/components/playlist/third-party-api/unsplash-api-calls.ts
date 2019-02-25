import fetch from 'node-fetch';

const clientId = process.env.UNSPLASH_CLIENT_ID;
const baseUrl = `https://api.unsplash.com/`;

export const getUnsplashPhoto = (query?: string) => {
    const url = (query) ? `${baseUrl}photos/random/?client_id=${clientId}&orientation=squarish&count=11&query=${query}` : `${baseUrl}photos/random/?client_id=${clientId}&orientation=squarish&count=11`;
    return fetch(url)
        .then(results => results.json())
        .then(results => {
            if (results && results.length && !results.errors) {
                return results.map((imageObject: any) => imageObject.urls.small);
            }
            return '';
        })
        .catch(error => {
            console.log(error);
            return '';
        });
}