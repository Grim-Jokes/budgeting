import { ListTransactionsResponse } from 'httptypes';
import React from 'react';
import { useGetTransactions } from "../hooks/get-transactions"

export function TransactionList() {

    const transactions = useGetTransactions();

    return (
        <div role="transaction-list">
            <ul>
                {transactions.map((entry: ListTransactionsResponse) => {
                    return (<li>
                        {entry.amount} - {entry.merchant} - {entry.date}
                    </li>);
                })}
            </ul>
        </div>)
}