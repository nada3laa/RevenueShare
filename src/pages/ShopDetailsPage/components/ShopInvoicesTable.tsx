import dayjs from 'dayjs';
import { DataGrid } from 'mantine-data-grid';

import { ShopInvoice } from '../../../api/types';
import { shopInvoiceColumnsDef } from '../ShopInvoiceColumns';

type ShopInvoicesTableProps = {
    data: ShopInvoice[];
    loading: boolean;
};

const ShopInvoicesTable = ({ data, loading }: ShopInvoicesTableProps) => {
    // if (dayjs(date).isValid()) {
    //     return dayjs(date).format('DD MMM YYYY');
    // } else {
    //     return '';
    // }
    const formattedData = data.map((invoice) => ({
        ...invoice,
        timestamp: dayjs(invoice?.timestamp ?? '').isValid()
            ? dayjs(invoice.timestamp).format('DD MMM YYYY - hh:mmA')
            : '',
    }));

    return (
        <DataGrid<ShopInvoice>
            data={formattedData}
            columns={shopInvoiceColumnsDef}
            loading={loading}
            striped
            withFixedHeader
            withColumnFilters
            withColumnResizing
            withPagination
            withSorting
            withGlobalFilter
            withBorder
            withColumnBorders
            highlightOnHover
        />
    );
};

export default ShopInvoicesTable;
