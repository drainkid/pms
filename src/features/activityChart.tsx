import {Card, CardContent, Typography} from "@mui/material";
import {BarChart} from "@mui/x-charts/BarChart";

type ActivityDay = {
    date: string;
    approved: number;
    rejected: number;
    requestChanges: number;
};

type Props = {
    title: string;
    data: ActivityDay[];
};

const ActivityChart = ({ title, data }: Props) => {
    const labels = data.map((d) => d.date.slice(5)); // MM-DD

    return (
        <Card>
            <CardContent>
                <Typography variant="subtitle1" fontWeight={600} mb={2}>
                    {title}
                </Typography>

                <BarChart
                    height={180}
                    xAxis={[
                        {
                            scaleType: "band",
                            data: labels,
                        },
                    ]}
                    series={[
                        {
                            label: "Одобрено",
                            data: data.map((d) => d.approved),
                            stack: "total",
                        },
                        {
                            label: "Отклонено",
                            data: data.map((d) => d.rejected),
                            stack: "total",
                        },
                        {
                            label: "На доработку",
                            data: data.map((d) => d.requestChanges),
                            stack: "total",
                        },
                    ]}
                    grid={{ horizontal: true }}
                />
            </CardContent>
        </Card>
    );
};

export default ActivityChart;
