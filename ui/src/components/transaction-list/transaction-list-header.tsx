import React from 'react';
import { TableCell, TableHead, TableRow } from "@material-ui/core";

export type Col = 'id' | 'merchant' | 'amount' | 'date' | '#' | 'category';

interface Props {
    children: Col[];
    className: string;
}

function toHeaderCell(col: Col) {
    return <TableCell>{col}</TableCell>
}

export function TransactionHeader(props: Props) {
    return <TableHead>
        <TableRow className={props.className}>
            {props.children.map(toHeaderCell)}
        </TableRow>
    </TableHead>
}