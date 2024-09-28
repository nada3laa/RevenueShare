import { Badge, Group, Paper, Skeleton, Title } from '@mantine/core';
import { DataGrid } from 'mantine-data-grid';
import { useNavigate } from 'react-router-dom';

import { useGetMallShopsQuery } from '../../api';
import { useAppSelector } from '../../store/hooks';
import { formatTimestamp } from '../../utils';

import { shopColumnsDef, type ShopData } from './ShopColumns';

export const ShopsPage = () => {
    const navigate = useNavigate();

    const currentScope = useAppSelector((state) => state.currentScope);

    const { data: mallShops, isFetching: isMallShopsLoading } = useGetMallShopsQuery({ id: currentScope.id });

    const gridData: ShopData[] =
        mallShops?.map((shop) => ({
            id: shop.id,
            name: shop.name ?? '',
            brand: shop.brand?.name ?? '',
            type: shop.brand?.brandType?.label ?? '',
            status: shop.status?.label ?? '',
            contractStart: formatTimestamp(shop.contract?.start ?? ''),
            contractEnd: formatTimestamp(shop.contract?.end ?? ''),
        })) ?? [];

    return (
        <>
            <Group position="apart" mb="md">
                <Title order={4}>
                    All Shops |{' '}
                    <Badge color="primary" variant="outline">
                        {mallShops ? mallShops.length : <Skeleton h={10} w={15} animate />}
                    </Badge>
                </Title>
            </Group>
            <Paper radius="md" p="xl" withBorder>
                <DataGrid<ShopData>
                    data={gridData}
                    columns={shopColumnsDef}
                    loading={isMallShopsLoading}
                    onRow={({ original }) => ({ onClick: () => navigate(`/shops/${original.id}`) })}
                    styles={() => ({ tr: { td: { cursor: 'pointer' } } })}
                    striped
                    withFixedHeader
                    withColumnFilters
                    withColumnResizing
                    withPagination
                    withSorting
                    withGlobalFilter
                    withBorder
                    withColumnBorders
                    highlightOnHover
                />
            </Paper>
        </>
    );
};
