// types/advert.ts
export type AdvertStatus = 'pending' | 'approved' | 'rejected' | 'draft';
export type AdvertPriority = 'normal' | 'urgent';

export interface Advert {
    id: number;
    title: string;
    price: number;
    category: string;
    createdAt: string;
    status: AdvertStatus;
    priority: AdvertPriority;
    images: string[];
}

export interface Pagination {
    currentPage: number,
    itemsPerPage: number,
    totalItems:number,
    totalPages: number
}

export type GetAdvertsParams = {
    page?: number
    limit?: number
    search?: string
    status?: string | null
    categoryId?: string | null
    minPrice?: number
    maxPrice?: number
    sortBy?: 'createdAt' | 'price' | 'priority'
    sortOrder?: 'desc' | 'asc'
}


export type StatsQueryParams = {
    period?: 'today' | 'week' | 'month' | 'custom'
    startDate?: string
    endDate?: string
}