import { Artist } from '../../../../models/Artist';

export const spotifyArtistConverter = (spotifyArtist: any) => {
    return new Artist({
        artistName: spotifyArtist.name,
        spotifyArtistId: spotifyArtist.id
    })
}