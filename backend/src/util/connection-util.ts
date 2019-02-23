import { Pool } from 'pg';

export const connectionPool = new Pool({
    user: process.env.DB_USERNAME,
    host: 'localhost',
    database: 'postgres',
    password: process.env.DB_PASSWORD,
    port: 5432,
    max: 2
})