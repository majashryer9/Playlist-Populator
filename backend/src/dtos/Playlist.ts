export class SqlPlaylist {

    public bucket_key: string = '';
    public owner_id: number = 0;
    public playlist_id: number = 0;
    public playlist_name: string = '';
    public saved: boolean = false;
    public unsplash_image_url: string = '';

    public constructor(init?: Partial<SqlPlaylist>) {
        Object.assign(this, init);
    }
}