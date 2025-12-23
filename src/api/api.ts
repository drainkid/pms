import axios from 'axios'


const api = axios.create({
    baseURL: "http://localhost:3001/api/v1",
})

export type GetAdvertsParams = {
    page?: number
    limit?: number
    search?: string
};

export const fetchAdvertisment = (params: GetAdvertsParams) => api.get('/ads',
    {params})

export const getAdvs = async (params:GetAdvertsParams) => {
    const res = await fetchAdvertisment(params)
    return res.data
}