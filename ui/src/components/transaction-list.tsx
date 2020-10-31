import { ListTransactionsResponse } from 'httptypes';
import React from 'react';
import { Column, DataGrid } from './shared/DataGrid';

import { useGetTransactions } from "../hooks/get-transactions"

export function TransactionList() {

    const transactions = useGetTransactions();
    const columns: Column[] = [
        {
            field: "id",
            headerName: "ID"
        },
        {
            field: "merchant",
            width: 400,
        },
        {
            field: "amount",
            valueFormatter: (params) => {
                return `$${params.value}`;
            }
        },
        {
            field: "date",
        }
    ]

    return (
        <DataGrid rows={transactions} columns={columns} />
    );
}