import { SqlPlaylist } from '../../dtos/Playlist';
import { Playlist } from '../../models/Playlist';

export const playlistConverter = (playlist: SqlPlaylist) => {
    return new Playlist({
        bucketKey: playlist.bucket_key,
        id: playlist.playlist_id,
        name: playlist.playlist_name,
        ownerId: playlist.owner_id,
        saved: playlist.saved,
        unsplashImageUrl: playlist.unsplash_image_url
    });
}