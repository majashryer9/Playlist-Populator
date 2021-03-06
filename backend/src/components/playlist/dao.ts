import { Playlist } from '../../models/Playlist';
import { connectionPool } from '../../util/connection-util';
import { Category } from '../../models/Category';
import { Song } from '../../models/Song';
import { playlistConverter } from './converter';
import { SqlPlaylist } from '../../dtos/Playlist';

export const getPlaylistsContainingSong = async (spotifyTrackId: string) => {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM playlist_populator.playlist
            INNER JOIN playlist_populator.playlists_songs USING(playlist_id)
            INNER JOIN playlist_populator.song USING(song_id)
            WHERE spotify_track_id=$1 AND saved=true AND LENGTH(unsplash_image_url) > 0`,
            [spotifyTrackId]
        );
        return (resp && resp.rows) ?
            resp.rows.map((playlist: SqlPlaylist) => playlistConverter(playlist)) : [];
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}

export const getPlaylistContainingSongsByGivenArtist = async (spotifyArtistId: string) => {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT DISTINCT ON(playlist_id) * FROM playlist_populator.playlist 
            INNER JOIN playlist_populator.playlists_songs USING(playlist_id)
            INNER JOIN playlist_populator.song USING(song_id)
            WHERE spotify_artist_id=$1 AND saved=true AND LENGTH(unsplash_image_url) > 0`,
            [spotifyArtistId]
        );
        return (resp && resp.rows) ?
            resp.rows.map((playlist: SqlPlaylist) => playlistConverter(playlist)) : [];
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}

export const getPlaylistWithinGivenCategory = async (categoryName: string) => {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM playlist_populator.playlist
            INNER JOIN playlist_populator.playlists_categories USING(playlist_id)
            INNER JOIN playlist_populator.category USING(category_id)
            WHERE category_name=$1 and saved=true AND LENGTH(unsplash_image_url) > 0`,
            [categoryName]
        );
        return (resp && resp.rows) ?
            resp.rows.map((playlist: SqlPlaylist) => playlistConverter(playlist)) : [];
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}

export const getUserPlaylists = async (userId: number) => {
    const client = await connectionPool.connect()
        .catch((err: Error) => { throw err });
    try {
        const resp = await client.query(
            `SELECT * FROM playlist_populator.playlist
            WHERE owner_id=$1 and saved=true`, [userId]
        );
        return (resp && resp.rows) ?
            resp.rows.map((playlist: SqlPlaylist) => playlistConverter(playlist)) : [];
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export const savePlaylist = async (playlist: Playlist) => {
    const client = await connectionPool.connect();
    try {
        // insert playlist information and get back a playlist id
        const resp = await client.query(
            `INSERT INTO playlist_populator.playlist(owner_id, playlist_name, playlist_description, bucket_key, saved, unsplash_image_url)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING playlist_id`,
            [playlist.ownerId, playlist.name, playlist.description, playlist.bucketKey, playlist.saved, playlist.unsplashImageUrl]
        )
        const playlistId = (resp && resp.rows && resp.rows.length) ? resp.rows[0].playlist_id : 0;
        if (playlistId) {
            // save playlist id with category ids in playlists_categories
            playlist.categories.forEach((category: Category) => {
                client.query(
                    `INSERT INTO playlist_populator.playlists_categories(playlist_id, category_id)
                    VALUES($1, $2)`, [playlistId, category.id]
                )
            })
            // save playlist id with song ids in playlists_songs
            playlist.songs.forEach((song: Song) => {
                client.query(
                    `INSERT INTO playlist_populator.playlists_songs(playlist_id, song_id)
                    VALUES($1, $2)`, [playlistId, song.id]
                )
            })
        }
        return playlistId;
    } catch (error) {
        console.log(error);
        return 0;
    } finally {
        client.release();
    }
}