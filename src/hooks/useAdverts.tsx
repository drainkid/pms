import {useQuery} from "@tanstack/react-query";
import {getAdvs} from "../api/api.ts";
import type {Advert, Pagination} from "../../types/advert.ts";

interface ApiResponse {
    ads: Advert[]
    pagination:Pagination
}

type Params = {
    page?: number
    limit?: number
    search?:string
}

export const useAdverts = (params?: Params) => {

    const {
        page = 1,
        limit = 10,
        search = '',
    } = params ?? {};


    return useQuery<ApiResponse>({
        queryFn: () => getAdvs({page, limit, search}),
        queryKey: ['ads', page, limit, search],

    })

};

