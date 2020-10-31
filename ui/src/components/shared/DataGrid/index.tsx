import React from 'react';
import { DataGrid as LibDataGrid, ColDef, RowData } from '@material-ui/data-grid';

export type Column = ColDef;
export type Row = RowData;
export type Props = {
    columns: Column[],
    rows: Row[];
};

export function DataGrid(props: Props) {
    return (
        <div style={{ height: '100%' }}>
            <LibDataGrid {...props} />
        </div>
    );
}