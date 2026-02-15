import {Card, CardContent, Typography} from "@mui/material"
import {PieChart} from "@mui/x-charts/PieChart"

type Props = {
    title: string
    approved: string
    rejected: string
    requestChanges: string
}

const DecisionChart = ({
                              title,
                              approved,
                              rejected,
                              requestChanges,
                          }: Props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="subtitle1" fontWeight={600} mb={2}>
                    {title}
                </Typography>

                <PieChart
                    height={200}
                    series={[
                        {
                            data: [
                                {
                                    id: 0,
                                    label: "Одобрено",
                                    value: Number(approved),
                                },
                                {
                                    id: 1,
                                    label: "Отклонено",
                                    value: Number(rejected),
                                },
                                {
                                    id: 2,
                                    label: "На доработку",
                                    value: Number(requestChanges),
                                },
                            ],
                            innerRadius: 50, // donut
                            outerRadius: 80,
                            paddingAngle: 2,
                        },
                    ]}
                />
            </CardContent>
        </Card>
    );
};

export default DecisionChart;
