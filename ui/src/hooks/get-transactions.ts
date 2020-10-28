import { useEffect, useState } from 'react';

import { ListTransactionsResponse } from 'httptypes';

export function useGetTransactions() {
    let [transactions, setTransactions] = useState<ListTransactionsResponse[]>([]);


    useEffect(() => {
        function saveTransactions(value: ListTransactionsResponse[]) {
            setTransactions(value);
        }

        fetch('http://localhost:3000/api/v1/transactions').then((response: Response) => {
            console.log(response);
            return response.json()
        }).then(saveTransactions);
    });

    return transactions;
}