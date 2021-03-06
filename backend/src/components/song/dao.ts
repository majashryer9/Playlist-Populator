import { connectionPool } from '../../util/connection-util';
import { Song } from '../../models/Song';
import { SqlSong } from '../../dtos/Song';
import { songConverter } from './converter';

export const getFrequentlyOccurringSongsWithGivenArtist = async (spotifyArtistId: string) => {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM playlist_populator.song
            INNER JOIN (
                SELECT song_id, COUNT(song_id) AS song_counter FROM playlist_populator.song
                INNER JOIN playlist_populator.playlists_songs USING(song_id)
                INNER JOIN playlist_populator.playlist USING(playlist_id)
                WHERE playlist_id IN (
                    SELECT playlist_id FROM playlist_populator.playlist
                    INNER JOIN playlist_populator.playlists_songs USING(playlist_id)
                    INNER JOIN playlist_populator.song USING(song_id)
                    WHERE spotify_artist_id=$1
                ) AND spotify_artist_id!=$1
                GROUP BY(song_id)
            ) AS songs USING(song_id)
            ORDER BY(song_counter) DESC
            LIMIT(20)`, [spotifyArtistId]
        );
        return (resp && resp.rows) ?
            resp.rows.map((song: SqlSong) => songConverter(song)) : [];
    } catch (error) {
        return [];
    } finally {
        client.release();
    }
}

export const getFrequentlyOccurringSongsWithGivenCategory = async (categoryName: string) => {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM playlist_populator.song
            INNER JOIN (
                SELECT song_id, COUNT(song_id) AS song_counter FROM playlist_populator.song
                INNER JOIN playlist_populator.playlists_songs USING(song_id)
                INNER JOIN playlist_populator.playlist USING(playlist_id)
                INNER JOIN playlist_populator.playlists_categories USING (playlist_id)
                INNER JOIN playlist_populator.category USING(category_id)
                WHERE category_name=$1
                GROUP BY(song_id)
            ) AS songs USING(song_id)
            ORDER BY(song_counter) DESC
            LIMIT(20)`, [categoryName]
        );
        return (resp && resp.rows) ?
            resp.rows.map((song: SqlSong) => songConverter(song)) : [];
    } catch (error) {
        return [];
    } finally {
        client.release();
    }
}

export const getPlaylistSongs = async (playlistId: number) => {
    const client = await connectionPool.connect()
        .catch((err: Error) => { throw err });
    try {
        const resp = await client.query(
            `SELECT * FROM playlist_populator.song
            INNER JOIN playlist_populator.playlists_songs USING(song_id)
            WHERE playlist_id = $1`,
            [playlistId]
        );
        return (resp && resp.rows) ?
            resp.rows.map((song: SqlSong) => songConverter(song)) : [];
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export const getSimilarSongs = async (songs: Song[]) => {
    const client = await connectionPool.connect();
    let songsString = `(`;
    for (let i = 1; i <= songs.length; i++) {
        songsString += (i < songs.length) ? `$${i}, ` : `$${i})`;
    }
    const songArray = songs.map((song: Song) => {
        return song.spotifyTrackId;
    });
    try {
        const resp = await client.query(
            `SELECT * FROM playlist_populator.song
            INNER JOIN (
                SELECT song_id, COUNT(song_id) AS song_counter FROM (
                    SELECT * FROM playlist_populator.song
                    INNER JOIN playlist_populator.playlists_songs USING(song_id)
                    INNER JOIN playlist_populator.playlist USING(playlist_id)
                    WHERE playlist_id IN (
                        SELECT playlist_id FROM playlist_populator.playlist
                        INNER JOIN playlist_populator.playlists_songs USING(playlist_id)
                        INNER JOIN playlist_populator.song USING(song_id)
                        WHERE spotify_track_id IN ${songsString}
                        GROUP BY(playlist_id)
                        HAVING COUNT(spotify_track_id) = ${songs.length}
                    ) AND spotify_track_id NOT IN ${songsString}
                ) AS similar_songs
                GROUP BY(song_id)
            ) AS populator_similar_songs USING(song_id)
            ORDER BY(song_counter) DESC
            LIMIT(10)`, songArray
        );
        return (resp && resp.rows) ?
            resp.rows.map((song: SqlSong) => songConverter(song)) : [];
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}

export const getSongIdBySpotifyTrackId = async (spotifyTrackId: string) => {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT song_id FROM playlist_populator.song
            WHERE spotify_track_id = $1`, [spotifyTrackId]
        );
        return (resp && resp.rows && resp.rows.length) ? resp.rows[0].song_id : 0;
    } catch (error) {
        console.log(error);
        return 0;
    } finally {
        client.release();
    }
}

export const getUserLikedSongs = async (userId: number) => {
    const client = await connectionPool.connect()
        .catch((err: Error) => { throw err });
    try {
        const resp = await client.query(
            `SELECT * FROM playlist_populator.song
            INNER JOIN playlist_populator.users_liked_songs USING(song_id)
            INNER JOIN playlist_populator.app_user USING(user_id)
            WHERE user_id=$1`, [userId]
        );
        return (resp && resp.rows) ?
            resp.rows.map((song: SqlSong) => songConverter(song)) : [];
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export const saveSong = async (song: Song) => {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `INSERT INTO playlist_populator.song(album_art_url, artist_name, danceability, 
            energy, popularity, preview_url, song_key, song_name, spotify_artist_id, 
            spotify_track_id, tempo, valence) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING song_id`,
            [song.albumArtUrl, song.artistName, song.danceability, song.energy, song.popularity,
            song.previewUrl, song.songKey, song.name, song.spotifyArtistId, song.spotifyTrackId,
            song.tempo, song.valence]
        );
        return (resp && resp.rows && resp.rows.length) ? resp.rows[0].song_id : 0;
    } catch (error) {
        console.log(error);
        return 0;
    } finally {
        client.release();
    }
}