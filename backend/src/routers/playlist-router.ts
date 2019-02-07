import Router, { Request, Response } from 'express';
import fetch from 'node-fetch';
import { getAccessToken } from '../util/access-token';
import { Song } from '../models/Song';
import { Category } from '../models/Category';
import * as songService from '../services/song-service';
import * as playlistService from '../services/playlist-service';

export const playlistRouter = Router();

/*
  GET
*/

playlistRouter.get('/categories', (req: Request, resp: Response, next: any) => {
  const url = `https://api.spotify.com/v1/browse/categories?country=US`;
  getAccessToken()
    .then(request => request.access_token)
    .then(accessToken => {
      fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(results => results.json())
        .then(results => (results.categories.items.length) ?
          resp.json(results.categories.items.map((spotifyCategory: any) => {
            return new Category({
              id: spotifyCategory.id,
              imageUrl: spotifyCategory.icons.length && spotifyCategory.icons[0].url,
              name: spotifyCategory.name
            })
          }))
          : resp.sendStatus(400))
        .catch(error => resp.sendStatus(500));
    })
    .catch(error => resp.sendStatus(500));
});

/*
  POST
*/

playlistRouter.post('/populate', async (req: Request, resp: Response) => {
  if (req.body.length) {
    const songs = await songService.getSimilarSongs(req.body);
    (songs instanceof Error) ? resp.sendStatus(500) : resp.json(songs);
  }
  else {
    resp.sendStatus(400);
  }
})

playlistRouter.post('/recommendations', (req: Request, resp: Response) => {
  const song = new Song(req.body);
  const url = `https://api.spotify.com/v1/recommendations?limit=15&market=US&seed_artists=${song.spotifyArtistId}&seed_tracks=${song.spotifyTrackId}`;
  getAccessToken()
    .then(request => request.access_token)
    .then(accessToken => {
      fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(results => results.json())
        .then(results => {
          const suggestedSongs = results.tracks.map((song: any) => {
            return new Song({
              artistName: (song.artists.length) ? song.artists[0].name : '',
              name: song.name,
              spotifyArtistId: (song.artists.length) ? song.artists[0].id : '',
              spotifyTrackId: song.id
            });
          })
          resp.json(suggestedSongs);
        })
        .catch(error => console.log(error));
    })
})

playlistRouter.post('/save-playlist', async (req: Request, resp: Response) => {
  const playlistId = await playlistService.savePlaylist(req.body);
  (playlistId)? resp.json(playlistId) : resp.sendStatus(500);
})

playlistRouter.post('/song-search', (req: Request, resp: Response) => {
  const song = new Song(req.body);
  const url = `https://api.spotify.com/v1/search?q=${encodeURI(`${song.name}`)}&type=track&market=US`;
  getAccessToken()
    .then(request => request.access_token)
    .then(accessToken => {
      fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(results => results.json())
        .then(results => resp.json(results.tracks.items))
        .catch(error => resp.sendStatus(500));
    })
    .catch(error => resp.sendStatus(500));
});