import { Entity, EntityParams } from "../entity";
import { MerchantName } from '@src/models/value-objects';

interface MerchantParams extends EntityParams {
    name: MerchantName;
}

export class Merchant extends Entity {
    public readonly name: MerchantName;
    constructor(params: MerchantParams) {
        super(params);
        this.name = params.name;
    }
}