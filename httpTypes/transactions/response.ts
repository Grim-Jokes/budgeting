export interface ListTransactionsResponse {
    id: number,
    merchant: string;
    amount: number;
    date: string;
}

export interface CreateTransactionResponse {
    id: number,
    merchant: string;
    amount: number;
    date: string;
}

export interface BulkCreateTransactionResponse {
    transactions: CreateTransactionResponse[],
    errors: string[];
}