import { Badge, Group, LoadingOverlay, Paper, Text, Title } from '@mantine/core';
import { DateRangePickerValue } from '@mantine/dates';
import { BarChart } from '@tremor/react';
import dayjs from 'dayjs';
import { useState } from 'react';

import '@tremor/react/dist/esm/tremor.css';

import { useGetStakeholderMallQuery } from '../../api';
import { useAppSelector } from '../../store/hooks';
import { getColorByArea, lastMonth, moneyFormat, today } from '../../utils';
import { ShopSales } from '../../api/types';
import { TotalControl } from '../../components/GraphControls';

export const SalesPage = () => {
    const [graphAreas, setGraphAreas] = useState<string[]>(['revenue', 'sales', 'refunds']);
    const [dateRange, setDateRange] = useState<DateRangePickerValue>([lastMonth, today]);
    const currentScope = useAppSelector((state) => state.currentScope);
    const { data: mallShopsSales, isFetching: isMallShopsSalesLoading } = useGetStakeholderMallQuery({
        id: currentScope.id,
        from: dayjs(dateRange[0] ?? lastMonth).format('YYYY-MM-DD'),
        to: dayjs(dateRange[1] ?? today).format('YYYY-MM-DD'),
    });

    const shopsWithBrandName = (mallShopsSales?.shops ?? []).filter((shop) => shop.brand?.name);

    const sumByBrand = shopsWithBrandName.reduce((acc: ShopSales[], curr: ShopSales) => {
        const existingShop = acc.find((shop) => shop.id === curr.id);
        const existingShopIndex = acc.findIndex((shop) => shop.id === curr.id);
        if (existingShop) {
            acc[existingShopIndex] = {
                ...existingShop,
                totalRevenue: existingShop.totalRevenue + curr.totalRevenue,
                totalSales: existingShop.totalSales + curr.totalSales,
                totalRefunds: existingShop.totalRefunds + curr.totalRefunds,
            };
        } else {
            acc.push(curr);
        }
        return acc;
    }, []);

    const chartData = sumByBrand.map((shop) => {
        return {
            shop: shop.brand.name,
            revenue: shop.totalRevenue,
            sales: shop.totalSales,
            refunds: shop.totalRefunds,
        };
    });

    return (
        <Paper radius="md" p="xl" withBorder>
            <Group position="apart">
                <Title>{currentScope.name}</Title>
                <Text>
                    Summary from <Badge variant="filled">{dayjs(dateRange[0]).format('DD MMM YYYY')}</Badge> to{' '}
                    <Badge variant="filled">{dayjs(dateRange[1]).format('DD MMM YYYY')}</Badge>
                </Text>
            </Group>
            <TotalControl
                onGraphAreasChange={setGraphAreas}
                onDateRangeChange={setDateRange}
                loading={isMallShopsSalesLoading}
            />
            <Paper mt={10} style={{ position: 'relative' }}>
                <LoadingOverlay visible={isMallShopsSalesLoading} overlayBlur={2} />
                <BarChart
                    showYAxis={false}
                    data={chartData}
                    categories={graphAreas}
                    dataKey="shop"
                    colors={getColorByArea(graphAreas)}
                    valueFormatter={moneyFormat}
                />
            </Paper>
        </Paper>
    );
};
