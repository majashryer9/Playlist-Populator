import { Category } from './Category';
import { Song } from './Song';

export class Playlist {
    public bucketKey: string = '';
    public categories: Category[] = [];
    public description: string = '';
    public id: number = 0;
    public name: string = '';
    public ownerId: number = 0;
    public saved: boolean = false;
    public songs: Song[] = [];
    public unsplashImageUrl: string = '';

    public constructor(init?: Partial<Playlist>) {
        Object.assign(this, init);
    }
}