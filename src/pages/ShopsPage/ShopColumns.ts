import { stringFilterFn } from 'mantine-data-grid';

import type { ColumnDef } from '@tanstack/react-table';

export type ShopData = {
    id: number;
    name: string;
    brand: string;
    type: string;
    status: string;
    contractStart: string;
    contractEnd: string;
};

export const shopColumnsDef: ColumnDef<ShopData, unknown>[] = [
    {
        header: 'Shop name',
        accessorKey: 'name',
        filterFn: stringFilterFn,
    },
    {
        header: 'Brand name',
        accessorKey: 'brand',
        filterFn: stringFilterFn,
    },
    {
        header: 'Type',
        accessorKey: 'type',
        filterFn: stringFilterFn,
    },
    {
        header: 'Shop status',
        accessorKey: 'status',
        filterFn: stringFilterFn,
    },
    {
        header: 'Contract start',
        accessorKey: 'contractStart',
        filterFn: stringFilterFn,
    },
    {
        header: 'Contract end',
        accessorKey: 'contractEnd',
        filterFn: stringFilterFn,
    },

    {
        header: 'Last Sync Date',
        accessorKey: 'lastSyncStatus',
        filterFn: stringFilterFn,
    },
];
