import { Song } from '../../../../models/Song';

export const spotifySongConverter = (spotifySong: any) => {
    return new Song({
        albumArtUrl: (spotifySong.album.images.length)? spotifySong.album.images[0].url : '',
        artistName: (spotifySong.artists.length)? spotifySong.artists[0].name : '',
        name: spotifySong.name,
        popularity: spotifySong.popularity,
        previewUrl: spotifySong.preview_url,
        spotifyArtistId: (spotifySong.artists.length)? spotifySong.artists[0].id : '',
        spotifyTrackId: spotifySong.id
    })
}