export class SqlUser {
    public buckey_key: string = '';
    public first_name: string = '';
    public user_id: number = 0;
    public last_name: string = '';
    public password: string = '';
    public username: string = '';

    public constructor(init?: Partial<SqlUser>) {
        Object.assign(this, init);
    }
}