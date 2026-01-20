import axios from 'axios'
import type {GetAdvertsParams, StatsQueryParams} from "../types/advert.ts";


const api = axios.create({
    baseURL:  "http://localhost:3001/api/v1",
})


type Reason = {
    reason: string,
    comment?: string
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