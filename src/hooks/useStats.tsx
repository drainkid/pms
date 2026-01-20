import {useQuery} from "@tanstack/react-query";
import {getChartAcitvity, getChartCategories, getChartDecisions, getStatsSummary,} from "../api/api";
import type {StatsQueryParams} from "../types/advert.ts";

export const useStats  = (params : StatsQueryParams = {}) => {

    return useQuery({
        queryFn: async () => {
            const [summary, activity, decisions, categories] = await Promise.all([
                getStatsSummary(params),
                getChartAcitvity(params),
                getChartDecisions(params),
                getChartCategories(params),
            ])
            return {summary, activity, decisions, categories}
        },
        queryKey: ['stats', params],
    })
}