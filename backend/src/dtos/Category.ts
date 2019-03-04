export class SqlCategory {
    
    public category_id: number = 0;
    public category_name: string = '';
    public image_url: string = '';

    public constructor(init?: Partial<SqlCategory>) {
        Object.assign(this, init);
    }
}