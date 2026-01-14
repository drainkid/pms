import {Card, CardContent, Typography} from "@mui/material";
import {BarChart} from "@mui/x-charts/BarChart";

type CategoryMap = Record<string, number>;

type Props = {
    title: string,
    data: CategoryMap
}


const CategoriesChart = ({ title, data }: Props) => {
    const categories = Object.keys(data);
    const counts = Object.values(data);

    return (
        <Card>
            <CardContent>
                <Typography variant="subtitle1" fontWeight={600} mb={2}>
                    {title}
                </Typography>

                <BarChart
                    height={220}
                    xAxis={[
                        {
                            scaleType: "band",
                            data: categories,
                        },
                    ]}
                    series={[
                        {
                            label: "Проверено объявлений",
                            data: counts,
                        },
                    ]}
                    grid={{ horizontal: true }}
                />
            </CardContent>
        </Card>
    );
};


export default CategoriesChart;
