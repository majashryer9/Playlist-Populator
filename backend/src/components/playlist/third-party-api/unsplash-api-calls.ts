import fetch from 'node-fetch';

export const getUnsplashPhoto = (query?: string) => {
    const baseUrl = `https://api.unsplash.com/`;
    const clientId = process.env.UNSPLASH_CLIENT_ID;
    const url = (query) ? `${baseUrl}photos/random/?client_id=${clientId}&orientation=squarish&count=10&query=${query}` : `${baseUrl}photos/random/?client_id=${clientId}&orientation=squarish&count=10`;
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