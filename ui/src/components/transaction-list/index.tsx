import React from 'react';
import { Table, TableContainer, TableRow, TableCell, TableBody, TableFooter, Button } from '@material-ui/core';

import { CreateTransactionResponse, ListTransactionsResponse } from 'httptypes';

import { useGetTransactions } from "../../hooks/get-transactions"
import { useClipboardData, PastedData } from '../../hooks/clipboard-data';
import { usePostTransactions } from '../../hooks/post-transactions';
import { Col, TransactionHeader } from './transaction-list-header';

import style from './transaction-list.module.css';

const columns: Col[] = ["#", 'merchant', 'amount', 'date'];

interface Transaction {
    id?: string | number,
    merchant: string,
    date: string,
    amount: number
}

function transactionToTableCell(item: Transaction | PastedData, index: number) {
    return (
        <TableRow>
            {columns.map((col: Col) => {
                if (col === "amount") {
                    return <TableCell> {`$${item[col]}`}</TableCell>
                }

                switch (col) {
                    case 'id':
                        return <TableCell></TableCell>
                    case '#':
                        return <TableCell>{index + 1}</TableCell>
                    case 'date':
                        if ('date' in item) {
                            return <TableCell>{item[col]}</TableCell>
                        } else {
                            return <TableCell>{item['transactionDate']}</TableCell>
                        }
                    default:
                        return <TableCell>{item[col]}</TableCell>
                }
            })
            }
        </TableRow >

    );
}

export function TransactionList() {

    let transactions: ListTransactionsResponse[] | CreateTransactionResponse[] = useGetTransactions();

    let [pastedData, clearPastedData] = useClipboardData();

    let newData: (CreateTransactionResponse | PastedData)[] = [];

    const [addedTrans, onClick] = usePostTransactions();

    if (addedTrans.transactions.length > 0) {
        newData = addedTrans.transactions;
        console.log(newData);
    }
    else if (pastedData.length > 0) {
        newData = pastedData;
    }

    const trans = [
        ...transactions,
        ...newData,
    ]

    console.log("TRANS", trans);

    let sum = {
        amount: 0
    }
    sum = trans.reduce((prev, curr) => {
        return {
            ...curr,
            merchant: 'total',
            amount: prev.amount + curr.amount
        }
    }, sum);

    return (
        <>

            <TableContainer className={style.tableContainer}>
                <div>
                    <Button variant="contained" color="primary" onClick={() => {
                        onClick(pastedData);
                        clearPastedData()
                    }}>Save</Button>
                </div>
                <Table>
                    <TransactionHeader className={style.tableHeaderRow}>
                        {columns}
                    </TransactionHeader>
                    <TableBody>
                        {trans.map(transactionToTableCell)}
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
        </>

    );
}