import NavBar from "../components/navBar.tsx";
import {Box, Grid, Stack, Typography} from "@mui/material";
import {useStats} from "../hooks/useStats.tsx";
import MetricCard from "../components/metricCard.tsx";
import PeriodFilters from "../features/periodFilters.tsx";
import {useSearchParams} from "react-router";
import ActivityChart from "../features/activityChart.tsx";
import MyCircProgress from "../components/myCircProgress.tsx";
import DecisionChart from "../features/decisionChart.tsx";
import CategoriesChart from "../features/categoriesChart.tsx";


const StatsPage = () => {

    const [searchParams] = useSearchParams()

    const period = searchParams.get('period') || undefined
    const startDate = searchParams.get('startDate') || undefined
    const endDate = searchParams.get('endDate') || undefined

    const {data, isLoading} = useStats(
        {period: period as 'today' | 'week' | 'month' | 'custom' | undefined,
        startDate,
        endDate
        })



    return (
        <>
            <NavBar/>
            <Box sx={{ maxWidth: 1100, mx: "auto", p: 4 }}>
                <Stack spacing={3}>
                    {/* Заголовок */}
                    <Typography variant="h5" fontWeight={600}>
                        Статистика
                    </Typography>
                    {/* Период */}
                    <PeriodFilters/>
                    {/* Метрики */}
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <MetricCard title="Проверено объявлений"
                                        value={data?.summary.totalReviewed}
                                        isLoading = {isLoading}/>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <MetricCard title="Одобрено"
                                        value={data?.summary.approvedPercentage + '%'}
                                        isLoading = {isLoading} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <MetricCard title="Отклонено"
                                        value= {data?.summary.rejectedPercentage + '%'}
                                        isLoading = {isLoading}/>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <MetricCard title="Среднее время проверки"
                                        value= {data?.summary.averageReviewTime}
                                        isLoading = {isLoading}/>
                        </Grid>
                    </Grid>

                    {/* Графики */}
                    <Stack spacing={3}>
                        {isLoading ? (
                            <MyCircProgress/>
                        ) : (
                            <>
                                <ActivityChart
                                    title="Активность за заданный период"
                                    data={data?.activity}
                                />
                                <DecisionChart
                                    title="Активность за заданный период"
                                    approved={data?.decisions.approved}
                                    rejected={data?.decisions.rejected}
                                    requestChanges={data?.decisions.requestChanges}
                                />
                                <CategoriesChart
                                    title='Активность за заданный период'
                                    data={data?.categories}
                                />

                            </>
                        )}
                    </Stack>
                </Stack>
            </Box>
        </>
    );
};

export default StatsPage;