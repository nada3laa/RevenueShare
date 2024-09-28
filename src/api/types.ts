import { type EntityObj } from '../types';

export enum UserRoles {
    Mall = 'Mall',
    Shop = 'Shop',
    Stakeholder = 'Stakeholder',
}

export type User = {
    id: string;
    name: string;
    role: UserRoles;
    userName: string;
};

export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    user: User;
    scope: EntityObj[];
};

export type GetById = {
    id: string;
};

export type GetMallShopRequest = {
    mallId: string;
    shopId: string;
};

export type GetMallShopInvoicesRequest = {
    mallId: string;
    shopId: string;
    from?: string;
    to?: string;
};

export type ShopInvoice = {
    id: number;
    type: string;
    timestamp: string;
    vat: number;
    subtotal: number;
    total: number;
};

export type GetMallShopInvoicesResponse = {
    invoices: ShopInvoice[];
    summary: {
        count: number;
        value: number;
        refundCount: number;
        refundValue: number;
    };
};

export type BrandType = {
    id: number;
    label: string;
};

export type GetMallBrandsResponse = {
    id: number;
    name: string;
    brandType: BrandType;
};

export type GetMallResponse = {
    id: number;
    name: string;
    summary: {
        shopCount: number;
        rentedCount: number;
        integratedCount: number;
    };
    location: {
        country: string;
        city: string;
        address: string;
    };
};

export type Contract = {
    start: string;
    end: string;
};

export type Status = {
    id: number;
    label: string;
};

export type GetMallShopResponse = {
    id: number;
    name: string;
    contract: Contract;
    brand: {
        id: number;
        name: string;
        brandType: BrandType;
    };
    status: Status;
    lastSyncStatus: string;
};

export type GetStakeholderMallRequest = {
    id: string;
    from: string;
    to: string;
};

export type ShopSales = {
    id: number;
    name: string;
    brand: {
        id: number;
        name: string;
    };
    totalRevenue: number;
    totalSales: number;
    totalRefunds: number;
    timestamp: string | null;
};

export type GetStakeholderMallResponse = {
    id: number;
    name: string;
    summary: {
        shopCount: number;
        rentedCount: number;
        integratedCount: number;
        totalRevenue: number;
    };
    shops: ShopSales[];
};
