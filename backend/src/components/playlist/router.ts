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

playlistRouter.post('/playlists-containing-song', async (req: Request, resp: Response) => {
  const playlists = await playlistService.getPlaylistsContainingSong(req.body);
  resp.json(playlists);
})

playlistRouter.post('/save-playlist', async (req: Request, resp: Response) => {
  const playlistIdAndSignedUrl = await playlistService.savePlaylist(req.body);
  (playlistIdAndSignedUrl.playlistId) ? resp.json(playlistIdAndSignedUrl) : resp.sendStatus(500);
})
