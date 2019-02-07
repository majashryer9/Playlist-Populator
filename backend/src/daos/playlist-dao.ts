import { Playlist } from "../models/Playlist";
import { connectionPool } from "../util/connection-util";
import { Category } from "../models/Category";
import { Song } from "../models/Song";

export const savePlaylist = async (playlist: Playlist) => {
    const client = await connectionPool.connect();
    try {
        // insert playlist information and get back a playlist id
        const resp = await client.query(
            `INSERT INTO playlist_populator.playlist(owner_id, playlist_name, bucket_key, saved)
            VALUES($1, $2, $3, $4) RETURNING playlist_id`,
            [playlist.ownerId, playlist.name, playlist.bucketKey, playlist.saved]
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
    } finally {
        client.release();
    }
}