export class Amount {
    private _value: number;
    public constructor(value: number | string) {

        if (value == null) {
            throw new Error("Amount cannot be undefined");
        }

        if (typeof value === "string") {
            this._value = Number.parseFloat(value);
        }
        else {
            this._value = value;
        }
    }

    public get value(): number {
        return this._value;
    }
}