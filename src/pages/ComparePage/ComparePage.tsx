import { Grid, Group, Paper, SegmentedControl, Select, SimpleGrid, Skeleton, Title } from '@mantine/core';
import { useState } from 'react';

import { useGetMallShopsQuery } from '../../api';
import ShopComparison from '../../components/ShopComparison';
import { useAppSelector } from '../../store/hooks';

export const ComparePage = () => {
    const currentScope = useAppSelector((state) => state.currentScope);
    const [compareBy, setCompareBy] = useState('day');
    const [shopA, setShopA] = useState<string | null>(null);
    const [shopB, setShopB] = useState<string | null>(null);

    const { data: mallShops, isFetching: isMallShopsLoading } = useGetMallShopsQuery({ id: currentScope.id });

    const shops = (mallShops ?? []).map(({ id, name, brand, status }) => {
        const disabled = status.label.trim() !== 'Integrated' && brand.name === null;
        const value = `${id}`;
        const label = disabled ? `(${id}) - Not integrated` : `${brand.name} (${name})`;
        return {
            value,
            label: label,
            disabled,
        };
    });

    const getSelectedShopById = (id: string) => {
        return mallShops?.find((shop) => shop.id.toString() === id);
    };

    const firstShop = shopA ? getSelectedShopById(shopA) : null;
    const secondShop = shopB ? getSelectedShopById(shopB) : null;

    return (
        <>
            <Group align="center" mb="md">
                <Title color="primary" order={4}>
                    Compare by
                </Title>
                <SegmentedControl
                    color="primary"
                    radius="xl"
                    fullWidth
                    value={compareBy}
                    onChange={setCompareBy}
                    data={[
                        { label: 'Day', value: 'day' },
                        { label: 'Month', value: 'month' },
                        { label: 'Year', value: 'year' },
                    ]}
                />
            </Group>
            <Paper radius="md" p="md" withBorder>
                <SimpleGrid cols={2}>
                    <Skeleton visible={isMallShopsLoading} mb="md" sx={{ zIndex: 10 }}>
                        <Select
                            data={shops}
                            label="Select a shop to compare"
                            placeholder="Search and select from integrated shops"
                            searchable
                            nothingFound="Nothing found"
                            value={shopA}
                            onChange={setShopA}
                        />
                    </Skeleton>
                    <Skeleton visible={isMallShopsLoading} mb="md" sx={{ zIndex: 10 }}>
                        <Select
                            data={shops}
                            label="Select a shop to compare"
                            placeholder="Search and select from integrated shops"
                            searchable
                            nothingFound="Nothing found"
                            value={shopB}
                            onChange={setShopB}
                        />
                    </Skeleton>
                </SimpleGrid>
                <Grid gutter="md">
                    {firstShop && (
                        <Grid.Col xs={12} lg={6}>
                            <ShopComparison shop={firstShop} compareBy={compareBy} />
                        </Grid.Col>
                    )}
                    {secondShop && (
                        <Grid.Col xs={12} lg={6}>
                            <ShopComparison shop={secondShop} compareBy={compareBy} />
                        </Grid.Col>
                    )}
                </Grid>
            </Paper>
        </>
    );
};
