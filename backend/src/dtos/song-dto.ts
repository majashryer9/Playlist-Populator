export class SqlSong {
    public album_art_url: string = '';
    public artist_name: string = '';
    public danceability: number = 0;
    public energy: number = 0;
    public popularity: number = 0;
    public song_id: number = 0;
    public song_key: number = 0;
    public song_name: string = '';
    public spotify_artist_id: string = '';
    public spotify_track_id: string = '';
    public tempo: number = 0;
    public valence: number = 0;

    public constructor(init?: Partial<SqlSong>) {
        Object.assign(this, init);
    }
}