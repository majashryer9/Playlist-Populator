export class Artist {
    
    public artistName: string = '';
    public spotifyArtistId: string = '';

    public constructor(init?: Partial<Artist>) {
        Object.assign(this, init);
    }
}