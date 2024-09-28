import { DateRangePicker, type DateRangePickerValue } from '@mantine/dates';
import { useState } from 'react';

import { lastMonth, today } from '../../utils';
type DashboardControlsProps = {
    onDateRangeChange: (dateRange: DateRangePickerValue) => void;
    loading: boolean;
};

export const DateRangePickerControl = ({ onDateRangeChange, loading }: DashboardControlsProps) => {
    const [dateRange, setDateRange] = useState<DateRangePickerValue>([lastMonth, today]);

    const dateRangeHandler = (range: DateRangePickerValue) => {
        if (range[0] && range[1]) {
            onDateRangeChange(range);
            setDateRange(range);
        }
    };

    return (
        <DateRangePicker
            disabled={loading}
            miw={300}
            inputFormat="DD MMM YYYY"
            range={[dateRange[0] ?? lastMonth, dateRange[1] ?? today]}
            amountOfMonths={2}
            label="Pick dates range"
            placeholder="Pick dates range"
            value={[dateRange[0] ?? lastMonth, dateRange[1] ?? today]}
            onChange={dateRangeHandler}
            allowLevelChange
            allowSingleDateInRange
            closeCalendarOnChange
        />
    );
};

export default DateRangePickerControl;
