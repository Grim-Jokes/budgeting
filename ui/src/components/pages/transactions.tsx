import { CreateTransactionResponse, ListTransactionsResponse } from 'httptypes';
import React, { useEffect, useState } from 'react';
import { useGetTransactions } from '../../hooks/get-transactions';
import { usePostTransactions } from '../../hooks/post-transactions';
import { PastePopup } from '../popups/paste-popup';
import { TransactionList } from '../transaction-list';
import { TransactionFilter } from '../transaction-filter';

import "react-datepicker/dist/react-datepicker.css";
import styles from './transactions.module.css';

function getSelected(day: number | void, today: Date) {


    if (day != null) {
        return new Date(today.getFullYear(), today.getMonth(), day)
    }
}

export function Transactions() {
    let [transactions, setTransactions] = useState<ListTransactionsResponse[] | CreateTransactionResponse[]>([]);
    let [date, setDate] = useState<Date>(new Date());
    let [day, setDay] = useState<number>();
    let [update, setUpdate] = useState(true);

    let trans = useGetTransactions({ date, day });

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
            <TransactionFilter
                onMonthChange={setDate}
                onYearChange={setDate}
                onDayChange={setDay}
                day={getSelected(day, date)}
                date={date}
            />
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