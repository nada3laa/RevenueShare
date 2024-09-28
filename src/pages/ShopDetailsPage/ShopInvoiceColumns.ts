import { stringFilterFn } from 'mantine-data-grid';

import { ShopInvoice } from '../../api/types';

import type { ColumnDef } from '@tanstack/react-table';

export const shopInvoiceColumnsDef: ColumnDef<ShopInvoice, unknown>[] = [
    {
        header: 'Invoice ID',
        accessorKey: 'id',
        filterFn: stringFilterFn,
    },
    {
        header: 'Inovice type',
        accessorKey: 'type',
        filterFn: stringFilterFn,
    },
    {
        header: 'Timestmap',
        accessorKey: 'timestamp',
        filterFn: stringFilterFn,
    },
    {
        header: 'VAT',
        accessorKey: 'vat',
        filterFn: stringFilterFn,
    },
    {
        header: 'Subtotal',
        accessorKey: 'subtotal',
        filterFn: stringFilterFn,
    },
    {
        header: 'Total',
        accessorKey: 'total',
        filterFn: stringFilterFn,
    },
];
