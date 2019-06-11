import Router, { Request, Response } from 'express';
import * as playlistService from './service';
import { getUnsplashPhoto } from './third-party-api/unsplash-api-calls';
import passport from 'passport';

export const playlistRouter = Router();

/*
  GET
*/

playlistRouter.get('/photo', async (req: Request, resp: Response) => {
  const photoUrl = await getUnsplashPhoto(req.query && req.query.query);
  resp.json(photoUrl);
})

playlistRouter.get('/user-playlists', passport.authenticate('jwt', { session: false }), async (req: Request, resp: Response) => {
  const userId = req.query.userId;
  if (!userId) return resp.status(400).json('Must include user id');
  const playlists = await playlistService.getUserPlaylists(userId)
    .catch((err: Error) => {
      const statusCode = (err.message === 'Internal Server Error') ? 500 : 400;
      resp.status(statusCode).json(err.message);
    });
  resp.json(playlists);
})

/*
  POST
*/

playlistRouter.post('/advanced-search', async (req: Request, resp: Response) => {
  const playlists = await playlistService.advancedSearch(req.body.spotifyTrackIds, req.body.spotifyArtistIds, req.body.categoryNames);
  resp.json(playlists);
})

playlistRouter.post('/playlists-containing-song', async (req: Request, resp: Response) => {
  const playlists = await playlistService.getPlaylistsContainingSong(req.body);
  resp.json(playlists);
})

playlistRouter.post('/save-playlist', async (req: Request, resp: Response) => {
  const playlist = req.body;
  if (!playlist.songs.length) { return resp.status(400).json('Must include songs') };
  const playlistIdAndSignedUrl = await playlistService.savePlaylist(req.body);
  (playlistIdAndSignedUrl.playlistId) ? resp.json(playlistIdAndSignedUrl) : resp.sendStatus(500);
})
