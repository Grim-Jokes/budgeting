import { useContext, useState } from 'react';

import { BulkCreateTransactionResponse, CreateTransactionRequest } from 'httptypes';
import { RequestContext } from '../components/providers/request';

export function usePostTransactions(): [BulkCreateTransactionResponse, (body: CreateTransactionRequest[]) => Promise<void>, () => void] {
    let request = useContext(RequestContext);
    const [addedTrans, setAddedTrans] = useState<BulkCreateTransactionResponse>({ transactions: [], errors: [] });

    async function post(body: CreateTransactionRequest[]) {
        if (body.length > 0) {
            const result = await request.post<CreateTransactionRequest[], BulkCreateTransactionResponse>('transactions', body);
            if (result) {
                setAddedTrans(result);
            }
        }
    };

    function cleanUp() {
        setAddedTrans({ transactions: [], errors: [] });
    }

    return [addedTrans, post, cleanUp]
}