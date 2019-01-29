import rp from 'request-promise';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
export const getAccessToken = () => {
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
    return rp.post(authOptions);
} 