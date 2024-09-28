import { Badge, Group, Paper, SimpleGrid, Skeleton, Text, ThemeIcon } from '@mantine/core';
import { IconReceipt2, IconReceiptRefund } from '@tabler/icons';

import { moneyFormat } from '../../../utils';

interface ShopInvoicesSummary {
    loading: boolean;
    count: number;
    value: number;
    refundCount: number;
    refundValue: number;
}

const ShopInvoicesSummary = ({ count, value, refundCount, refundValue, loading }: ShopInvoicesSummary) => {
    return (
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'md', cols: 1 }]} mt="sm">
            <Paper px={20} py={5} withBorder>
                <Group position="apart">
                    <div>
                        <Badge color="green">{count - refundCount} Sale Invoices</Badge>
                        <Skeleton visible={loading} miw={100}>
                            <Text weight={700} size="xl">
                                {moneyFormat(value - refundValue)}
                            </Text>
                        </Skeleton>
                    </div>
                    <ThemeIcon color="green" size={40} radius="md">
                        <IconReceipt2 size={30} stroke={1.5} />
                    </ThemeIcon>
                </Group>
            </Paper>
            <Paper px={20} py={5} withBorder>
                <Group position="apart">
                    <div>
                        <Badge color="red">{refundCount} Refund Invoices</Badge>
                        <Skeleton visible={loading} miw={100}>
                            <Text weight={700} size="xl">
                                {moneyFormat(refundValue)}
                            </Text>
                        </Skeleton>
                    </div>
                    <ThemeIcon color="red" size={40} radius="md">
                        <IconReceiptRefund size={30} stroke={1.5} />
                    </ThemeIcon>
                </Group>
            </Paper>
        </SimpleGrid>
    );
};

export default ShopInvoicesSummary;
