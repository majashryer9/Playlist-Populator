import Router, { Request, Response } from 'express';
import * as spotifyApiCalls from './third-party-api/spotify-api/spotify-api-calls';

export const artistRouter = Router();

artistRouter.post('/artist-search', async (req: Request, resp: Response) => {
    const artists = await spotifyApiCalls.searchForArtist(req.body);
    resp.json(artists);
})