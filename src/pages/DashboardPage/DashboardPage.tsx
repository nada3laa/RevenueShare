import { Badge, Group, LoadingOverlay, Paper, Text, Title } from '@mantine/core';
import { DateRangePickerValue } from '@mantine/dates';
import { AreaChart } from '@tremor/react';
import dayjs from 'dayjs';
import { useState } from 'react';

import '@tremor/react/dist/esm/tremor.css';

import { useGetMallQuery, useGetStakeholderMallQuery } from '../../api';
import { TotalControl } from '../../components/GraphControls';
import { useAppSelector } from '../../store/hooks';
import {
    extractShopsSales,
    getColorByArea,
    getSummary,
    lastMonth,
    moneyFormat,
    sortShopsSales,
    sumByDate,
    today,
} from '../../utils';

import ShopsSummary from './components/ShopsSummary';
import TotalSummary from './components/TotalSummary';

export const DashboardPage = () => {
    const [graphAreas, setGraphAreas] = useState<string[]>(['revenue', 'sales', 'refunds']);
    const [dateRange, setDateRange] = useState<DateRangePickerValue>([lastMonth, today]);
    const currentScope = useAppSelector((state) => state.currentScope);
    const { data: mallData, isFetching: isMallLoading } = useGetMallQuery({ id: currentScope.id });
    const { data: mallShopsSales, isFetching: isMallShopsSalesLoading } = useGetStakeholderMallQuery({
        id: currentScope.id,
        from: dayjs(dateRange[0] ?? lastMonth).format('YYYY-MM-DD'),
        to: dayjs(dateRange[1] ?? today).format('YYYY-MM-DD'),
    });

    const chartData = sumByDate(sortShopsSales(extractShopsSales(mallShopsSales?.shops ?? [])));

    const shopsSummary = mallData?.summary ?? { integratedCount: 0, rentedCount: 0, shopCount: 0 };

    return (
        <Paper radius="md" p="xl" withBorder>
            <Group position="apart">
                <Title>{currentScope.name}</Title>
                <Text>
                    Summary from <Badge variant="filled">{dayjs(dateRange[0]).format('DD MMM YYYY')}</Badge> to{' '}
                    <Badge variant="filled">{dayjs(dateRange[1]).format('DD MMM YYYY')}</Badge>
                </Text>
            </Group>
            <ShopsSummary loading={isMallLoading} {...shopsSummary} />
            <TotalSummary {...getSummary(chartData)} loading={isMallShopsSalesLoading} />
            <TotalControl
                onGraphAreasChange={setGraphAreas}
                onDateRangeChange={setDateRange}
                loading={isMallShopsSalesLoading}
            />
            <Paper mt={10} style={{ position: 'relative' }}>
                <LoadingOverlay visible={isMallShopsSalesLoading} overlayBlur={2} />
                <AreaChart
                    yAxisWidth="w-20"
                    data={chartData}
                    categories={graphAreas}
                    dataKey="timestamp"
                    colors={getColorByArea(graphAreas)}
                    valueFormatter={moneyFormat}
                />
            </Paper>
        </Paper>
    );
};
