import { Badge, Group, Paper, SimpleGrid, Skeleton, Text, ThemeIcon } from '@mantine/core';
import { IconReceiptRefund, IconReportMoney, IconTrendingUp } from '@tabler/icons';

import { moneyFormat, SumOfTotal } from '../../../utils';

interface TotalSummaryProps extends SumOfTotal {
    loading: boolean;
}

const TotalSummary = ({ refunds, revenue, sales, loading }: TotalSummaryProps) => {
    return (
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'md', cols: 1 }]} mt="sm">
            <Paper px={20} py={5} withBorder>
                <Group position="apart">
                    <div>
                        <Badge color="green">Revenue</Badge>
                        <Skeleton visible={loading} miw={100}>
                            <Text weight={700} size="xl">
                                {moneyFormat(revenue)}
                            </Text>
                        </Skeleton>
                    </div>
                    <ThemeIcon color="green" size={40} radius="md">
                        <IconTrendingUp size={30} stroke={1.5} />
                    </ThemeIcon>
                </Group>
            </Paper>
            <Paper px={20} py={5} withBorder>
                <Group position="apart">
                    <div>
                        <Badge color="blue">Sales</Badge>
                        <Skeleton visible={loading} miw={100}>
                            <Text weight={700} size="xl">
                                {moneyFormat(sales)}
                            </Text>
                        </Skeleton>
                    </div>
                    <ThemeIcon color="blue" size={40} radius="md">
                        <IconReportMoney size={30} stroke={1.5} />
                    </ThemeIcon>
                </Group>
            </Paper>
            <Paper px={20} py={5} withBorder>
                <Group position="apart">
                    <div>
                        <Badge color="orange">Refunds</Badge>
                        <Skeleton visible={loading} miw={100}>
                            <Text weight={700} size="xl">
                                {moneyFormat(refunds)}
                            </Text>
                        </Skeleton>
                    </div>
                    <ThemeIcon color="orange" size={40} radius="md">
                        <IconReceiptRefund size={30} stroke={1.5} />
                    </ThemeIcon>
                </Group>
            </Paper>
        </SimpleGrid>
    );
};

export default TotalSummary;
