import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
    user: 'admin',
    database: "budget",
    password: 'admin',
    port: 5432

});

export async function connect() {
    return pool.connect()
}