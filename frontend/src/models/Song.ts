export class Song {

    public albumArtUrl: string = '';
    public artistName: string = '';
    public danceability: number = 0;
    public energy: number = 0;
    public id: number = 0;
    public name: string = '';
    public popularity: number = 0;
    public previewUrl: string = '';
    public songKey: number = 0;
    public spotifyArtistId: string = '';
    public spotifyTrackId: string = '';
    public tempo: number = 0;
    public valence: number = 0;

    public constructor(init?: Partial<Song>) {
        Object.assign(this, init);
    }
}