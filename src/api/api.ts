import axios from 'axios'


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + 'api/v1' || "http://localhost:3001/api/v1",
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


type Reason = {
    reason: string,
    comment?: string
}


export type StatsQueryParams = {
    period?: 'today' | 'week' | 'month' | 'custom'
    startDate?: string
    endDate?: string
}

export const fetchAdvertisment = (params: GetAdvertsParams) => api.get('/ads',
    {params})

export const getAdvs = async (params:GetAdvertsParams) => {
    const res = await fetchAdvertisment(params)
    return res.data
}

export const getAdvById = async (id:string) => {
   const res =  await  api.get(`/ads/${id}`)
   return res.data
}

export const approveAdv = async (id:string) => {
    const res = await api.post(`/ads/${id}/approve`)
    return res.data
}

export const rejectAdv = async (id:string, reason:Reason) => {
    const res = await api.post(`/ads/${id}/reject`, reason)
    return res.data
}

export const updateAdv = async (id:string, reason:Reason) => {
    const res = await api.post(`/ads/${id}/request-changes`, reason)
    return res.data
}


export const getStatsSummary = async (params:StatsQueryParams) => {
    const res = await api.get('/stats/summary', {params})
    return res.data
}

export const getChartAcitvity = async (params:StatsQueryParams) => {
    const res = await api.get('/stats/chart/activity', {params})
    return res.data
}

export const getChartDecisions = async (params:StatsQueryParams) => {
    const res = await api.get('/stats/chart/decisions', {params})
    return res.data
}

export const getChartCategories = async (params:StatsQueryParams) => {
    const res = await api.get('/stats/chart/categories', {params})
    return res.data
}