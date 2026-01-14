import {useQuery} from "@tanstack/react-query";
import {type GetAdvertsParams, getAdvs} from "../api/api.ts";
import type {Advert, Pagination} from "../types/advert.ts";

interface ApiResponse {
    ads: Advert[]
    pagination:Pagination
}


export const useAdverts = (params?: GetAdvertsParams) => {

    const {
        page = 1,
        limit = 10,
        search = '',
        status = [],
        categoryId = 0,
        sortBy = '',
        maxPrice = '',
        minPrice = '',
        sortOrder ='',
    } = params ?? {};


    return useQuery<ApiResponse>({
        queryFn: () => getAdvs(params ?? {}),
        queryKey: ['ads', page, limit, search, status, categoryId,sortBy,sortOrder, maxPrice, minPrice ],

    })

}

