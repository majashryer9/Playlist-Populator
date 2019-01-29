export class Category {
    public id: string = '';
    public imageUrl: string = '';
    public name: string = '';

    public constructor(init?: Partial<Category>) {
        Object.assign(this, init);
    }
}