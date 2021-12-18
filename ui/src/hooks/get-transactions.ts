import { useContext, useEffect, useState } from 'react';

import { ListTransactionsResponse } from 'httptypes';
import { RequestContext } from '../components/providers/request';



export function useGetTransactions(params?: { date?: Date, day?: number }) {
    let request = useContext(RequestContext);

    let year: number | void;
    let month: number | void;
    let day: number | void | undefined;

    if (params && params.date) {
        year = params.date.getFullYear();
        month = params.date.getMonth() + 1;
    }

    let [transactions, setTransactions] = useState<ListTransactionsResponse[]>([]);

    useEffect(() => {
        function saveTransactions(value: ListTransactionsResponse[]) {
            setTransactions(value);
        }

        request.get<ListTransactionsResponse[]>(`transactions`, { urlParams: [year, month, day] }).then(saveTransactions);
    }, [request, year, month, day]);

    return transactions;
}