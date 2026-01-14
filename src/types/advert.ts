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