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

export interface ListTransactionsQuery {
    year?: string;
    month?: string;
    merchant?: {
        name: string,
        searchType?: string
    };
    since?: "true" | "false";
}