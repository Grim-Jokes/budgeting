import { CreateTransactionResponse, ListTransactionsResponse } from 'httptypes';
import React, { useEffect, useState } from 'react';
import { useGetTransactions } from '../../hooks/get-transactions';
import { usePostTransactions } from '../../hooks/post-transactions';
import { PastePopup } from '../popups/paste-popup';
import { TransactionList } from '../transaction-list';

export function Transactions() {
    let [transactions, setTransactions] = useState<ListTransactionsResponse[] | CreateTransactionResponse[]>([]);
    let [update, setUpdate] = useState(true);

    let trans = useGetTransactions();

    const [addedTrans, post, cleanup] = usePostTransactions();

    useEffect(() => {
        if (trans !== transactions && transactions.length === 0) {
            setTransactions(trans);
        }
        else if (addedTrans.transactions.length > 0) {
            setTransactions([...transactions, ...addedTrans.transactions]);
            cleanup();
        }
    }, [transactions, addedTrans, cleanup, trans]);


    return (
        <>
            <div className="content">
                <PastePopup onDataSaved={(data) => {
                    post(data);
                    console.log("onDataSaved update", update);
                    setUpdate(true);
                }} />
                <TransactionList transactions={transactions} />
            </div>
        </>);
}