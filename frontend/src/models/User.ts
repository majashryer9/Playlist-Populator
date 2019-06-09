import { Playlist } from './Playlist';
import { Song } from './Song';

export class User {
    public bucketKey: string = '';
    public firstName: string = '';
    public id: number = 0;
    public lastName: string = '';
    public likedSongs: Song[] = [];
    public password: string = '';
    public playlists: Playlist[] = [];
    public username: string = '';

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}