import { Checkbox, Group, Paper } from '@mantine/core';
import { type DateRangePickerValue } from '@mantine/dates';
import { useState } from 'react';

import { lastMonth, today } from '../../utils';

import { DateRangePickerControl } from './DateRangePickerControl';

type DashboardControlsProps = {
    onGraphAreasChange: (areas: string[]) => void;
    onDateRangeChange: (dateRange: DateRangePickerValue) => void;
    loading: boolean;
};

const checkBoxStyles = {
    input: { cursor: 'pointer' },
    label: { cursor: 'pointer' },
};

export const TotalControl = ({ onGraphAreasChange, onDateRangeChange, loading }: DashboardControlsProps) => {
    const [graphAreas, setGraphAreas] = useState<string[]>(['revenue', 'sales', 'refunds']);
    const [, setDateRange] = useState<DateRangePickerValue>([lastMonth, today]);

    const graphAreasHandler = (areas: string[]) => {
        onGraphAreasChange(areas);
        setGraphAreas(areas);
    };
    const dateRangeHandler = (range: DateRangePickerValue) => {
        onDateRangeChange(range);
        setDateRange(range);
    };

    return (
        <Paper shadow="sm" mt={10} p={20} withBorder>
            <Group position="apart">
                <DateRangePickerControl loading={loading} onDateRangeChange={dateRangeHandler} />

                <Checkbox.Group label="Select graph areas" value={graphAreas} onChange={graphAreasHandler}>
                    <Checkbox
                        color="green"
                        value="revenue"
                        label="Total Revenue"
                        disabled={loading}
                        styles={checkBoxStyles}
                    />
                    <Checkbox
                        color="blue"
                        value="sales"
                        label="Total Sales"
                        disabled={loading}
                        styles={checkBoxStyles}
                    />
                    <Checkbox
                        color="orange"
                        value="refunds"
                        label="Total Refunds"
                        disabled={loading}
                        styles={checkBoxStyles}
                    />
                </Checkbox.Group>
            </Group>
        </Paper>
    );
};

export default TotalControl;
