import { PoolClient } from "pg";
import { Merchant, MerchantName } from "@src/models/value-objects";
import { Repository } from "./repository";
import { MerchantsRepository } from "@src/models/repositories";

interface MerchantDTO {
    id: number;
    name: string;
}

function mapMapEntryToEntity(merchant: MerchantDTO) {
    return new Merchant({
        id: merchant.id,
        name: new MerchantName(merchant.name),
    })
}

export class Merchants extends Repository<MerchantDTO> implements MerchantsRepository {

    private constructor(client: PoolClient) {
        super(client);
    }

    async list(): Promise<Merchant[]> {
        const result = await super.listModels("merchant");

        return result.rows.map(mapMapEntryToEntity)
    }

    async get(id: number): Promise<Merchant> {
        const result = await super.getModel(
            "SELECT id, name FROM merchant WHERE id = $1::integer",
            [id]
        );

        if (!result) {
            throw new Error(`Merchant id ${id} not found`);
        }

        return mapMapEntryToEntity(result);
    }

    async getByName(name: string): Promise<Merchant | void> {
        const result = await super.getModel(
            "SELECT id, name FROM merchant WHERE name = $1::text",
            [name]
        );

        if (result) {
            return mapMapEntryToEntity(result);
        }
    }

    async save(merchant: Merchant): Promise<Merchant> {
        try {
            const insertedId = await super.insertModel(`
        INSERT INTO public.merchant(
            "name"
        )
        VALUES (
            $1::text
        )
        RETURNING id;`,
                [merchant.name.value]);

            const ret = new Merchant({
                name: merchant.name,
                id: insertedId
            });

            return ret;
        }
        catch (err) {
            throw err;
        }
    }

}