import { PoolClient, QueryResult } from "pg";

import { connect } from "../postgress";
import { addDisposable, IDisposable } from "../cleanup";

type RepoConstructor<T> = new (...args: any[]) => T;

/// Base class that handles connecting to the pg database.
export class Repository<R = { id: number }> implements IDisposable {

    protected constructor(protected client: PoolClient) { }

    // Inserts the model into the database and retrieves the appropriate id
    protected async insertModel(query: string, values: (string | number)[]): Promise<number> {
        const result = await this.client.query({
            text: query,
            values
        });

        if (result.rowCount == 0) {
            throw new Error("Insertion failed")
        }

        return result.rows[0].id;
    }

    protected async listModels(query: string): Promise<QueryResult<R>> {
        let q = await this.client.query<R>({
            text: query
        });

        return q;
    }

    protected async getModel(query: string, values: (string | number)[]): Promise<R | void> {
        let q = await this.client.query<R>({
            text: query,
            values
        });

        if (q.rowCount <= 1) {
            return q.rows[0];
        }

        throw new Error("Too many rows for get");
    }

    dispose() {
        this.client.release();
    }

    public static async getRepo<T extends IDisposable>(...args: any[]): Promise<T> {
        const client = await connect();

        // @ts-ignore
        const ctr: RepoConstructor<T> = this;

        let repo: T = new ctr(client, ...args);

        addDisposable(repo);

        return repo;
    }
}