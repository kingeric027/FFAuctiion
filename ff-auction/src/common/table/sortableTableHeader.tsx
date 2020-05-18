import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@material-ui/core';

export type OrderDirection = "asc" | "desc";


export interface TableColumn {
    id: string,
    numeric: boolean,
    disablePadding: boolean,
    label: string
}

interface SortProps {
    orderBy: string,
    order: OrderDirection,
    onRequestSort: (property: any) => void
}

interface TableHeadProps {
    columns: TableColumn[],
    sortProps?: SortProps
}

const SortableTableHead: React.FunctionComponent<TableHeadProps> = (props)  =>  {
    const { columns,  sortProps } = props;
    return <TableHead>
        <TableRow>
            {columns.map((col:TableColumn) => (
                <TableCell 
                    key={col.id}
                    align={'left'}
                    padding={col.disablePadding ? 'none' : 'default'}
                    sortDirection={sortProps  && sortProps.orderBy === col.id ? sortProps.order : false}>
                    {sortProps && 
                    <TableSortLabel
                        active={sortProps.orderBy === col.id}
                        direction={sortProps.orderBy === col.id ? sortProps.order : 'asc'}
                        onClick={() => sortProps.onRequestSort(col.id)}>
                        {col.label}
                    </TableSortLabel>
                    }
                    {col.label} 
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
}

export default SortableTableHead;