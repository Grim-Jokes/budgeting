import React from 'react';
import { Table, TableContainer, TableRow, TableCell, TableBody, TableFooter } from '@material-ui/core';

import { CreateTransactionResponse, ListTransactionsResponse } from 'httptypes';

import { PastedData } from '../../hooks/clipboard-data';
import { Col, TransactionHeader } from './transaction-list-header';

import style from './transaction-list.module.css';
import { ParsedTransaction } from '../../services/parsers';

const columns: Col[] = ["#", 'category', 'merchant', 'amount', 'date'];

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
                    let className = '';
                    if (item[col] > 0) {
                        className = 'income'
                    } else if (item[col] < 0) {
                        className = 'expense'
                    }

                    return <TableCell>
                        <span className={className}>
                            {`$${item[col]}`}
                        </span>
                    </TableCell>
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
                    case 'category':
                        return <TableCell></TableCell>
                    default:
                        return <TableCell>{item[col]}</TableCell>
                }
            })
            }
        </TableRow >

    );
}


export interface Props {
    transactions?: ListTransactionsResponse[] | CreateTransactionResponse[] | ParsedTransaction[];
}

export function TransactionList(props: Props) {

    let transactions = props.transactions || [];

    let sum = {
        amount: 0
    }

    sum = transactions.reduce((prev, curr) => {
        return {
            ...curr,
            merchant: 'total',
            amount: prev.amount + curr.amount
        }
    }, sum);

    return (
        <>
            <TableContainer className={style.tableContainer}>
                <Table>
                    <TransactionHeader className={style.tableHeaderRow}>
                        {columns}
                    </TransactionHeader>
                    <TableBody className={style.tableBody}>
                        {transactions.map(transactionToTableCell)}
                    </TableBody>
                    <TableFooter className={style.tableBody}>
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