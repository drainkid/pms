import {Card, CardContent, Skeleton, Typography} from "@mui/material";

type MetricCardProps = {
    value?: string | number
    title: string
    isLoading?: boolean
};

const MetricCard = ({ value, title, isLoading}: MetricCardProps) => {
    return (
        <Card>
            <CardContent>
                {isLoading ? (
                    <>
                        {/* Заголовок */}
                        <Skeleton
                            variant="text"
                            height={18}
                        />

                        {/* Значение */}
                        <Skeleton
                            variant="text"
                            height={36}
                            sx={{ mt: 1 }}
                        />
                    </>
                ) : (
                    <>
                        <Typography variant="body2" fontWeight={300}>
                            {title}
                        </Typography>
                        <Typography variant="h5" fontWeight={600}>
                            {value}
                        </Typography>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default MetricCard;
