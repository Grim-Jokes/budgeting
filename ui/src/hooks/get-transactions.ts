import { useContext, useEffect, useState } from 'react';

import { ListTransactionsResponse } from 'httptypes';
import { RequestContext } from '../components/providers/request';

export function useGetTransactions(args = []) {
    let request = useContext(RequestContext);

    let [transactions, setTransactions] = useState<ListTransactionsResponse[]>([]);


    useEffect(() => {
        function saveTransactions(value: ListTransactionsResponse[]) {
            setTransactions(value);
        }

        request.get<ListTransactionsResponse[]>('transactions').then(saveTransactions);
    }, [request]);

    return transactions;
}