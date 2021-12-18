export interface EntityParams {
    id?: number;
}

export class Entity {
    public readonly id?: number
    constructor(params: EntityParams) {
        this.id = params.id;
    }
}