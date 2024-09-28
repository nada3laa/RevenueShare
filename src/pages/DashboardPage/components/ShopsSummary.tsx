import { Center, Group, Loader, Paper, RingProgress, SimpleGrid, Skeleton, Text, Title } from '@mantine/core';

type ShopsSummaryProps = {
    integratedCount: number;
    rentedCount: number;
    shopCount: number;
    loading: boolean;
};

const ShopsSummary = ({ integratedCount, rentedCount, shopCount, loading }: ShopsSummaryProps) => {
    const getPercentage = (count: number) => ~~((count * 100) / shopCount) ?? 0;

    return (
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'md', cols: 1 }]} mt="xl">
            <Paper px={10} py={5} withBorder>
                <Group>
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={[{ value: 100, color: 'blue' }]}
                        label={
                            <Center>
                                {loading ? (
                                    <Loader color="blue" />
                                ) : (
                                    <Title order={5} color="blue">{`${getPercentage(shopCount)}%`}</Title>
                                )}
                            </Center>
                        }
                    />
                    <div>
                        <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                            All Shops
                        </Text>
                        <Skeleton visible={loading} w={30} animate>
                            <Text weight={700} size="xl">
                                {shopCount}
                            </Text>
                        </Skeleton>
                    </div>
                </Group>
            </Paper>
            <Paper px={10} py={5} withBorder>
                <Group>
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={[{ value: getPercentage(rentedCount), color: 'orange' }]}
                        label={
                            <Center>
                                {loading ? (
                                    <Loader color="orange" />
                                ) : (
                                    <Title order={5} color="orange">{`${getPercentage(rentedCount)}%`}</Title>
                                )}
                            </Center>
                        }
                    />
                    <div>
                        <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                            Rented shops
                        </Text>
                        <Skeleton visible={loading} w={30} animate>
                            <Text weight={700} size="xl">
                                {rentedCount}
                            </Text>
                        </Skeleton>
                    </div>
                </Group>
            </Paper>
            <Paper px={10} py={5} withBorder>
                <Group>
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={[{ value: getPercentage(integratedCount), color: 'green' }]}
                        label={
                            <Center>
                                {loading ? (
                                    <Loader color="green" />
                                ) : (
                                    <Title order={5} color="green">{`${getPercentage(integratedCount)}%`}</Title>
                                )}
                            </Center>
                        }
                    />
                    <div>
                        <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                            Integrated shops
                        </Text>
                        <Skeleton visible={loading} w={30} animate>
                            <Text weight={700} size="xl">
                                {integratedCount}
                            </Text>
                        </Skeleton>
                    </div>
                </Group>
            </Paper>
        </SimpleGrid>
    );
};

export default ShopsSummary;
