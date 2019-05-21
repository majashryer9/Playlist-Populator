import rp from 'request-promise';

export const getAccessToken = () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    }
    return rp.post(authOptions).then(request => request.access_token);
}