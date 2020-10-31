import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@material-ui/core';

import { useGetTransactions } from "../../hooks/get-transactions"

import style from './transaction-list.module.css';
import { useClipboardData } from '../../hooks/clipboard-data';

type Col = 'id' | 'merchant' | 'amount' | 'date';
const columns: Col[] = ['id', 'merchant', 'amount', 'date'];

interface Transaction {
    id?: string | number,
    merchant: string,
    date: string,
    amount: number
}

function transactionToTableCell(item: Transaction) {
    return (
        <TableRow>
            {columns.map((col: Col) => {
                if (col === "amount") {
                    return <TableCell> {`$${item[col]}`}</TableCell>
                }
                return (
                    <TableCell> {item[col]}</TableCell>
                )
            })
            }
        </TableRow >

    );
}

export function TransactionList() {
    let transactions: Transaction[] = useGetTransactions();
    let sum = {
        amount: 0
    }

    let pastedData = useClipboardData();

    transactions = transactions.concat(pastedData || []).filter((x) => !Number.isNaN(x));

    sum = transactions.reduce((prev, curr) => {
        return {
            ...curr,
            merchant: 'total',
            amount: prev.amount + curr.amount
        }
    }, sum)
    
    console.log(transactions);


    return (
        <TableContainer style={{ width: '50%', 'margin': 'auto' }} className={style.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((item) => <TableCell>{item}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(transactionToTableCell)}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell>{`$${sum.amount}`}</TableCell>
                        <TableCell />
                    </TableRow>
                </TableFooter>
            </Table>

        </TableContainer>

    );
}