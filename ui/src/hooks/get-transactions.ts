import { useContext, useEffect, useState } from 'react';

import { ListTransactionsResponse } from 'httptypes';
import { RequestContext } from '../components/providers/request';

export function useGetTransactions(date?: Date) {
    let request = useContext(RequestContext);

    let year: number | void;
    let month: number | void;

    if (date) {
        year = date.getFullYear();
        month = date.getMonth() + 1;
    }

    let [transactions, setTransactions] = useState<ListTransactionsResponse[]>([]);

    useEffect(() => {
        function saveTransactions(value: ListTransactionsResponse[]) {
            setTransactions(value);
        }

        request.get<ListTransactionsResponse[]>(`transactions/${year}/${month}`).then(saveTransactions);
    }, [request, year, month]);

    return transactions;
}