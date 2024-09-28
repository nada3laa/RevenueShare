import { Badge, Group, SimpleGrid, Skeleton, Text, ThemeIcon } from '@mantine/core';
import { IconBuildingStore, IconCalendarOff, IconCalendarTime, IconHanger, IconId } from '@tabler/icons';
import dayjs from 'dayjs';

import { GetMallShopResponse } from '../../../api/types';

type ShopDetailsSummaryProps = {
    loading: boolean;
    shopData: GetMallShopResponse | undefined;
};

const ShopDetailsSummary = ({ shopData, loading }: ShopDetailsSummaryProps) => {
    return (
        <SimpleGrid
            cols={5}
            breakpoints={[
                { maxWidth: 'md', cols: 3 },
                { maxWidth: 'sm', cols: 2 },
                { maxWidth: 'xs', cols: 1 },
            ]}
        >
            <Group>
                <ThemeIcon color="orange" size="lg">
                    <IconId />
                </ThemeIcon>
                <div>
                    <Text size="xs" color="dimmed" lh={1}>
                        Name
                    </Text>
                    <Skeleton animate visible={loading}>
                        <Text weight={500} size="sm">
                            {shopData?.name ?? <Badge color="red">N/A</Badge>}
                        </Text>
                    </Skeleton>
                </div>
            </Group>

            <Group>
                <ThemeIcon color="green" size="lg">
                    <IconHanger />
                </ThemeIcon>
                <div>
                    <Text size="xs" color="dimmed" lh={1}>
                        Brand
                    </Text>
                    <Skeleton animate visible={loading}>
                        <Text weight={500} size="sm">
                            {shopData?.brand?.name ?? <Badge color="red">N/A</Badge>}
                        </Text>
                    </Skeleton>
                </div>
            </Group>

            <Group>
                <ThemeIcon color="blue" size="lg">
                    <IconBuildingStore />
                </ThemeIcon>
                <div>
                    <Text size="xs" color="dimmed" lh={1}>
                        Type
                    </Text>
                    <Skeleton animate visible={loading}>
                        <Text weight={500} size="sm">
                            {shopData?.brand?.brandType?.label ?? <Badge color="red">N/A</Badge>}
                        </Text>
                    </Skeleton>
                </div>
            </Group>
            <Group>
                <ThemeIcon color="grape" size="lg">
                    <IconCalendarTime />
                </ThemeIcon>
                <div>
                    <Text size="xs" color="dimmed" lh={1}>
                        Contract Start
                    </Text>
                    <Skeleton animate visible={loading}>
                        <Text weight={500} size="sm">
                            {dayjs(shopData?.contract.start).isValid() ? (
                                dayjs(shopData?.contract.start).format('DD MMM YYYY')
                            ) : (
                                <Badge color="red">N/A</Badge>
                            )}
                        </Text>
                    </Skeleton>
                </div>
            </Group>
            <Group>
                <ThemeIcon color="red" size="lg">
                    <IconCalendarOff />
                </ThemeIcon>
                <div>
                    <Text size="xs" color="dimmed" lh={1}>
                        Contract End
                    </Text>
                    <Skeleton animate visible={loading}>
                        <Text weight={500} size="sm">
                            {dayjs(shopData?.contract.end).isValid() ? (
                                dayjs(shopData?.contract.end).format('DD MMM YYYY')
                            ) : (
                                <Badge color="red">N/A</Badge>
                            )}
                        </Text>
                    </Skeleton>
                </div>
            </Group>
        </SimpleGrid>
    );
};
export default ShopDetailsSummary;
