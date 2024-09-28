import dayjs from 'dayjs';

import { ShopInvoice, ShopSales } from './api/types';

type PagesIndexMap = {
    [key: string]: string;
};

export type Total = {
    timestamp: string;
    refunds: number;
    revenue: number;
    sales: number;
};

export type GroupedByDate<T> = {
    [key: string]: T;
};

export type SumOfTotal = {
    refunds: number;
    revenue: number;
    sales: number;
};

export type ShopInvoicesSum = {
    timestamp: string;
    sale: number;
    refund: number;
};

export type MinShopInvoice = {
    sales: number;
    refund: number;
    timestamp: string;
};

export const pagesIndex: PagesIndexMap = {
    '/': 'Dashboard',
    '/shops': 'Shops',
};

export const formatTimestamp = (date: string) => {
    if (dayjs(date).isValid()) {
        return dayjs(date).format('DD MMM YYYY');
    } else {
        return '';
    }
};

export const extractShopsSales = (shopsSales: ShopSales[]) => {
    return shopsSales.reduce((total: Total[], sale: ShopSales) => {
        const { timestamp, totalRefunds, totalSales, totalRevenue } = sale;

        if (timestamp !== null) {
            total.push({
                timestamp: formatTimestamp(timestamp),
                refunds: totalRefunds,
                sales: totalSales,
                revenue: totalRevenue,
            });
        }

        return total;
    }, []);
};

export const extractShopInvoices = (invoices: ShopInvoice[] = []): MinShopInvoice[] => {
    return invoices.reduce((allInvoices: MinShopInvoice[], invoice: ShopInvoice) => {
        const { timestamp, type, total } = invoice;

        if (timestamp !== null) {
            allInvoices.push({
                timestamp: formatTimestamp(timestamp),
                sales: type === 'Sales' && total > 0 ? total : 0,
                refund: type === 'Refund' && total < 0 ? total : 0,
            });
        }

        return allInvoices;
    }, []);
};

export const sumShopInvoicesByDate = (total: MinShopInvoice[]) =>
    Object.values(
        total.reduce((acc: GroupedByDate<MinShopInvoice>, item: MinShopInvoice) => {
            acc[item.timestamp] = acc[item.timestamp]
                ? {
                      ...item,
                      sales: Number((item.sales + acc[item.timestamp].sales).toFixed(2)),
                      refund: Number((item.refund + acc[item.timestamp].refund).toFixed(2)),
                  }
                : item;
            return acc;
        }, {}),
    );

export const sortShopsSales = (shopSales: Total[]) =>
    shopSales.sort((a, b) => (dayjs(b.timestamp).isBefore(dayjs(a.timestamp)) ? 1 : -1));

export const sumByDate = (total: Total[]) =>
    Object.values(
        total.reduce((acc: GroupedByDate<Total>, item: Total) => {
            acc[item.timestamp] = acc[item.timestamp]
                ? {
                      ...item,
                      refunds: Number((item.refunds + acc[item.timestamp].refunds).toFixed(2)),
                      sales: Number((item.sales + acc[item.timestamp].sales).toFixed(2)),
                      revenue: Number((item.revenue + acc[item.timestamp].revenue).toFixed(2)),
                  }
                : item;
            return acc;
        }, {}),
    );

export const getSummary = (total: Total[]) =>
    total.reduce(
        (acc, curr) => {
            return {
                refunds: Number(Number(curr.refunds + Number(acc.refunds ?? 0)).toFixed(2)),
                sales: Number(Number(curr.sales + Number(acc.sales ?? 0)).toFixed(2)),
                revenue: Number(Number(curr.revenue + Number(acc.revenue ?? 0)).toFixed(2)),
            };
        },
        { refunds: 0, sales: 0, revenue: 0 },
    );

export const getColorByArea = (areas: string[]) =>
    areas.map((area) => {
        switch (area) {
            case 'revenue':
                return 'green';

            case 'sales':
                return 'blue';
            case 'refund':
            case 'refunds':
                return 'orange';

            default:
                return 'gray';
        }
    });

export const moneyFormat = (number: number) =>
    Intl.NumberFormat('en-EG', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);

export const today = new Date();
export const lastMonth = new Date(new Date().setDate(today.getDate() - 30));
