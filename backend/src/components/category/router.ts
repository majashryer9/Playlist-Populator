import Router, { Request, Response } from 'express';
import * as spotifyApiCalls from './third-party-api/spotify-api/spotify-api-calls';

export const categoryRouter = Router();

categoryRouter.get('/get-categories', async (req: Request, resp: Response) => {
    const categories = await spotifyApiCalls.getCategories();
    resp.json(categories);
})