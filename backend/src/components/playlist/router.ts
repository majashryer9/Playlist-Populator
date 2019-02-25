import Router, { Request, Response } from 'express';
import * as playlistService from './service';
import { getUnsplashPhoto } from './third-party-api/unsplash-api-calls';

export const playlistRouter = Router();

/*
  GET
*/

playlistRouter.get('/photo', async (req: Request, resp: Response) => {
  const photoUrl = await getUnsplashPhoto(req.query && req.query.query);
  resp.json(photoUrl);
})

/*
  POST
*/

playlistRouter.post('/save-playlist', async (req: Request, resp: Response) => {
  const playlistId = await playlistService.savePlaylist(req.body);
  (playlistId) ? resp.json(playlistId) : resp.sendStatus(500);
})
