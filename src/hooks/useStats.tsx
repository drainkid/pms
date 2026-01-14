import {useQuery} from "@tanstack/react-query";
import {
    getChartAcitvity,
    getChartCategories,
    getChartDecisions,
    getStatsSummary,
    type StatsQueryParams
} from "../api/api";

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