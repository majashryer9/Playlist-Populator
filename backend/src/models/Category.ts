export class Category {
    public id: number = 0;
    public imageUrl: string = '';
    public name: string = '';

    public constructor(init?: Partial<Category>) {
        Object.assign(this, init);
    }
}