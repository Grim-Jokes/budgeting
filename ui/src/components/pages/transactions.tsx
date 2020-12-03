import { CreateTransactionResponse, ListTransactionsResponse } from 'httptypes';
import React, { useEffect, useState } from 'react';
import { useGetTransactions } from '../../hooks/get-transactions';
import { usePostTransactions } from '../../hooks/post-transactions';
import { PastePopup } from '../popups/paste-popup';
import { TransactionList } from '../transaction-list';

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import styles from './transactions.module.css';

export function Transactions() {
    let [transactions, setTransactions] = useState<ListTransactionsResponse[] | CreateTransactionResponse[]>([]);
    let [date, setDate] = useState<Date>(new Date());
    let [update, setUpdate] = useState(true);
    let trans = useGetTransactions(date);

    const [addedTrans, post, cleanup] = usePostTransactions();

    useEffect(() => {
        if (trans.length !== transactions.length) {
            setTransactions(trans);
        }
        else if (addedTrans.transactions.length > 0) {
            setTransactions([...transactions, ...addedTrans.transactions]);
            cleanup();
        }
    }, [transactions, addedTrans, cleanup, trans]);

    return (
        <>
            <FormGroup row>
                <FormControlLabel
                    control={<>
                        <DatePicker
                            selected={date}
                            onChange={(date: Date) => setDate(date)}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                        />
                    </>}
                    label="Date"
                    labelPlacement="start"
                />
            </FormGroup>
            <PastePopup onDataSaved={(data) => {
                post(data);
                console.log("onDataSaved update", update);
                setUpdate(true);
            }} />
            <div className={styles.transactionsContainer}>
                <TransactionList transactions={transactions} />
            </div>
        </>);
}