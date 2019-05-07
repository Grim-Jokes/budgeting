export class MerchantName {
    constructor(public readonly value: string) {
        if (!this.value) {
            throw new Error("Merchant name must not be " + this.value);
        }
    }
}