import { SqlSong } from '../../dtos/Song';
import { Song } from '../../models/Song';
export const songConverter = (song: SqlSong) => {
    return new Song({
        albumArtUrl: song.album_art_url,
        artistName: song.artist_name,
        danceability: song.danceability,
        energy: song.energy,
        id: song.song_id,
        name: song.song_name,
        popularity: song.popularity,
        songKey: song.song_key,
        spotifyArtistId: song.spotify_artist_id,
        spotifyTrackId: song.spotify_track_id,
        tempo: song.tempo,
        valence: song.valence
    });
}