import Router, { Request, Response } from 'express';
import * as songService from './service';
import * as spotifyApiCalls from './third-party-api/spotify-api/spotify-api-calls';

export const songRouter = Router();

songRouter.get('/artists-top-songs/:spotifyArtistId', async (req: Request, resp: Response) => {
    const topSongs = await spotifyApiCalls.getArtistsTopSongs(req.params.spotifyArtistId);
    resp.json(topSongs);
})

songRouter.post('/frequently-occurring-songs-with-artists', async (req: Request, resp: Response) => {
    const frequentlyOccurringSongs = await songService.getFrequentlyOccurringSongsWithGivenArtists(req.body.artists);
    resp.json(frequentlyOccurringSongs);
})

songRouter.post('/frequently-occurring-songs-with-categories', async (req: Request, resp: Response) => {
    const frequentlyOccurringSongs = await songService.getFrequentlyOccurringSongsWithGivenCategories(req.body.categories);
    resp.json(frequentlyOccurringSongs);
})

songRouter.post('/frequently-occurring-songs-with-songs', async (req: Request, resp: Response) => {
    const frequentlyOccurringSongs = await songService.getFrequentlyOccurringSongsWithGivenSongs(req.body.songs);
    resp.json(frequentlyOccurringSongs);
})

songRouter.post('/recommendations', async (req: Request, resp: Response) => {
    const recommendations = await spotifyApiCalls.getSpotifyRecommendations(req.body);
    resp.json(recommendations);
})

songRouter.post('/song-search', async (req: Request, resp: Response) => {
    const song = await spotifyApiCalls.searchForSong(req.body);
    resp.json(song);
})

songRouter.post('/similar-songs', async (req: Request, resp: Response) => {
    const similarSongs = await songService.getSimilarSongs(req.body);
    resp.json(similarSongs);
})