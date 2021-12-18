import { Pool } from 'pg';

const pool = new Pool();

export async function connect() {
    return pool.connect()
}