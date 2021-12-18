export interface CreateTransactionRequestNewMerchant {
    merchantId?: number;
    merchant: string;
    amount: number;
    date: string | number;
}

export interface CreateTransactionRequestExistingMerchant {
    merchantId: number;
    merchant?: string;
    amount: number;
    date: string | number;
}

export type CreateTransactionRequest = CreateTransactionRequestNewMerchant | CreateTransactionRequestExistingMerchant;

export interface ListTransactionUrlParam {
    year: string,
    month?: string,
    day?: string,
}