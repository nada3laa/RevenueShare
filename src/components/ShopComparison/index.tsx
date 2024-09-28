import { useTheme } from '@emotion/react';
import {
    Badge,
    Checkbox,
    Grid,
    Group,
    Loader,
    LoadingOverlay,
    Paper,
    Stack,
    Text,
    Title,
    UnstyledButton,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { AreaChart } from '@tremor/react';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

import { useGetMallShopInvoicesWithFilterQuery } from '../../api';
import { GetMallShopResponse } from '../../api/types';
import ShopInvoicesSummary from '../../pages/ShopDetailsPage/components/ShopInvoicesSummary';
import { useAppSelector } from '../../store/hooks';

import {
    extractShopInvoices,
    formatTimestamp,
    getColorByArea,
    moneyFormat,
    sumShopInvoicesByDate,
    today,
} from './../../utils';
import { useStyles } from './styles';

type ShopComparisonProps = {
    shop?: GetMallShopResponse;
    compareBy: string;
};

const defaultSummary = {
    count: 0,
    value: 0,
    refundCount: 0,
    refundValue: 0,
};

const manipulateDate = (compareBy: string, date: Date, direction: 'add' | 'subtract' = 'add') => {
    switch (compareBy) {
        case 'day': {
            return dayjs(date)[direction](1, 'day');
        }
        case 'month': {
            return dayjs(date)[direction](1, 'month');
        }
        case 'year': {
            return dayjs(date)[direction](1, 'year');
        }
        default: {
            return dayjs(date)[direction](1, 'day');
        }
    }
};

function ShopComparison({ shop, compareBy }: ShopComparisonProps) {
    const [graphAreas, setGraphAreas] = useState<string[]>(['sales', 'refund']);

    const theme = useTheme();
    const ref = useRef<HTMLInputElement>(null);
    const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`, true, {
        getInitialValueInEffect: false,
    });
    const currentScopeId = useAppSelector((state) => state.currentScope.id);
    const { classes } = useStyles();
    const [date, setDate] = useState(today);

    const { data: shopInvoices, isFetching } = useGetMallShopInvoicesWithFilterQuery(
        {
            mallId: currentScopeId,
            shopId: shop?.id.toString() as string,
            from: dayjs(date).format('YYYY-MM-DD'),
            to: manipulateDate(compareBy, date).format('YYYY-MM-DD'),
        },
        { skip: shop?.id === undefined },
    );

    if (!shop) {
        return <Loader />;
    }

    const chartData = sumShopInvoicesByDate(extractShopInvoices(shopInvoices?.invoices ?? []));

    return (
        <>
            <Group position="apart" align="center">
                <Group>
                    <Title order={3}>{shop.brand.name}</Title>
                    <Badge>{shop.brand.brandType.label}</Badge>
                </Group>
                <Text color="dimmed" size="xs">
                    Contract from {formatTimestamp(shop.contract.start)} to {formatTimestamp(shop.contract.end)}
                </Text>
            </Group>
            <Paper p="md" shadow="md" withBorder>
                <Grid align="center">
                    <Grid.Col span="content">
                        <Stack spacing={0}>
                            <UnstyledButton
                                className={classes.control}
                                onClick={() => setDate((current) => manipulateDate(compareBy, current, 'add').toDate())}
                            >
                                <IconChevronUp className={classes.controlIcon} stroke={1.5} />
                            </UnstyledButton>

                            <Stack align="center" justify="center" spacing={0}>
                                <UnstyledButton
                                    onClick={() => ref.current?.click()}
                                    sx={(theme) => ({
                                        textAlign: 'center',
                                        ':hover': { color: theme.colors.primary[2] },
                                    })}
                                >
                                    <Title lh={1} order={1}>
                                        {dayjs(date).format('DD')}
                                    </Title>
                                    <Text lh={1}>{dayjs(date).format('MMMM')}</Text>
                                    <Text>{dayjs(date).format('YYYY')}</Text>
                                </UnstyledButton>
                                <DatePicker
                                    allowLevelChange
                                    clearable={false}
                                    ref={ref}
                                    hidden={true}
                                    dropdownType={isSmallScreen ? 'modal' : 'popover'}
                                    value={date}
                                    onChange={(value) => setDate((prevState) => (value ? value : prevState))}
                                />
                            </Stack>

                            <UnstyledButton
                                className={classes.control}
                                onClick={() =>
                                    setDate((current) => manipulateDate(compareBy, current, 'subtract').toDate())
                                }
                            >
                                <IconChevronDown className={classes.controlIcon} stroke={1.5} />
                            </UnstyledButton>
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span="auto">
                        <ShopInvoicesSummary {...(shopInvoices?.summary ?? defaultSummary)} loading={isFetching} />
                        <Text size="xs" mt="md">
                            Summary from <Badge variant="filled">{dayjs(date).format('DD MMM YYYY')}</Badge> to{' '}
                            <Badge variant="filled">{manipulateDate(compareBy, date).format('DD MMM YYYY')}</Badge>
                        </Text>
                    </Grid.Col>
                </Grid>
            </Paper>
            <Paper mb="md" style={{ position: 'relative' }}>
                <Checkbox.Group label="Select graph areas" value={graphAreas} onChange={setGraphAreas}>
                    <Checkbox color="blue" value="sales" label="Total Sales" disabled={isFetching} />
                    <Checkbox color="orange" value="refund" label="Total Refunds" disabled={isFetching} />
                </Checkbox.Group>

                <LoadingOverlay visible={isFetching} overlayBlur={2} />
                <AreaChart
                    yAxisWidth="w-20"
                    data={chartData ?? []}
                    categories={graphAreas}
                    dataKey="timestamp"
                    colors={getColorByArea(graphAreas)}
                    valueFormatter={moneyFormat}
                />
            </Paper>
        </>
    );
}

export default ShopComparison;
