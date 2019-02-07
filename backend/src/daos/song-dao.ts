import { connectionPool } from '../util/connection-util';
import { Song } from '../models/Song';
import { SqlSong } from '../dtos/song-dto';
import { songConverter } from '../util/song-converter';

export const getSimilarSongs = async (songs: Song[]) => {
    // const client = await connectionPool.connect();
    // let songsString = `(`;
    // let i;
    // for (i = 1; i <= songs.length; i++) {
    //     songsString += (i < songs.length) ? `$${i}, ` : `$${i})`;
    // }
    // let artistsString = `(`
    // for (let j = i; j <= i + songs.length - 1; j++) {
    //     artistsString += (j < i + songs.length - 1) ? `$${j}, ` : `$${j})`;
    // }
    // const songArray = songs.map((song: Song) => {
    //     return song.songName;
    // });
    // const artistArray = songs.map((song: Song) => {
    //     return song.artistName;
    // });
    // const infoArray = songArray.concat(artistArray);
    // try {
    //     const resp = await client.query(
    //         `SELECT * FROM playlist_populator.song
    //         INNER JOIN (
    //             SELECT song_id, COUNT(song_id) AS song_counter FROM (
    //                 SELECT * FROM playlist_populator.song
    //                 INNER JOIN playlist_populator.playlists_songs USING(song_id)
    //                 INNER JOIN playlist_populator.playlist USING(playlist_id)
    //                 WHERE playlist_id IN (
    //                     SELECT playlist_id FROM playlist_populator.playlist
    //                     INNER JOIN playlist_populator.playlists_songs USING(playlist_id)
    //                     INNER JOIN playlist_populator.song USING(song_id)
    //                     WHERE song_name IN ${songsString} AND artist_name IN ${artistsString}
    //                     GROUP BY(playlist_id)
    //                     HAVING COUNT(song_name) = ${songs.length}
    //                 )
    //             ) AS similar_songs
    //             GROUP BY(song_id)
    //         ) AS populator_similar_songs USING(song_id)
    //         WHERE song_name NOT IN ${songsString} OR artist_name NOT IN ${artistsString}
    //         ORDER BY(song_counter) DESC
    //         LIMIT(10)`, infoArray);
    const client = await connectionPool.connect();
    let songsString = `(`;
    let i;
    for (i = 1; i <= songs.length; i++) {
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
                    )
                ) AS similar_songs
                GROUP BY(song_id)
            ) AS populator_similar_songs USING(song_id)
            WHERE spotify_track_id NOT IN ${songsString}
            ORDER BY(song_counter) DESC
            LIMIT(10)`, songArray
        );
        return (resp) ? resp.rows.map((song: SqlSong) => {
            return songConverter(new SqlSong(song));
        }) : [];
    } catch (error) {
        console.log(error);
        return new Error('Database failure');
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
    } finally {
        client.release();
    }
}

export const saveSong = async (song: Song) => {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `INSERT INTO playlist_populator.song(album_art_url, artist_name, danceability, energy, 
            popularity, song_key, song_name, spotify_artist_id, spotify_track_id, tempo, valence)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING song_id`,
            [song.albumArtUrl, song.artistName, song.danceability, song.energy, song.popularity, song.songKey,
            song.name, song.spotifyArtistId, song.spotifyTrackId, song.tempo, song.valence]
        );
        return (resp && resp.rows && resp.rows.length) ? resp.rows[0].song_id : 0;
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}