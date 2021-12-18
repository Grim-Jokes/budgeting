import React from 'react';

import { request } from '../../services/request';

interface Props {
    children: any
}

export const RequestContext = React.createContext(request);

export function RequestProvider(props: Props) {
    return (
        <RequestContext.Provider value={request}>
            {props.children}
        </RequestContext.Provider>
    );
}
