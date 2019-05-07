export class Amount {
    private _value: number;
    public constructor(value: string) {        
        this._value = Number.parseFloat(value);
    }

    public get value(): number {
        return this._value;
    }
}