import axios from 'axios'


const api = axios.create({
    baseURL: "http://localhost:3001/api/v1",
})

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
};

export const fetchAdvertisment = (params: GetAdvertsParams) => api.get('/ads',
    {params})

export const getAdvs = async (params:GetAdvertsParams) => {
    const res = await fetchAdvertisment(params)
    return res.data
}