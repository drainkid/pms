import {Box, Card, CardContent, CardMedia, Chip, type ChipProps, Stack, Typography,} from "@mui/material";
import type {Advert, AdvertStatus} from "../types/advert.ts";
import {useNavigate} from "react-router";

type Props = {
    advert: Advert
}


const AdvCard = ({advert} : Props )=> {

    const {
        title,
        price,
        category,
        createdAt,
        status,
        priority,
        images,
    } = advert;

    const statusMap: Record<AdvertStatus, { label: string; color: ChipProps['color'] }> = {
        pending: { label: 'На модерации', color: 'warning' },
        draft: { label: 'Отправлено на доработку', color: 'warning' },
        approved: { label: 'Одобрено', color: 'success' },
        rejected: { label: 'Отклонено', color: 'error' },
    };

    const navigate = useNavigate()


    return (
        <Card sx={{ width: 320, cursor: 'pointer' }} onClick={() => navigate(`item/${advert.id}`)}>
            {/* IMAGE */}
            <CardMedia
                component="img"
                height="180"
                image={images?.[0] ?? 'https://placehold.co/300x200'}
                alt={title}
            />

            <CardContent>
                <Stack spacing={1}>
                    {/* TITLE */}
                    <Typography variant="subtitle1" fontWeight={600} noWrap>
                        {title}
                    </Typography>

                    {/* PRICE */}
                    <Typography variant="h6">
                        {price.toLocaleString()} ₽
                    </Typography>

                    {/* CATEGORY */}
                    <Typography variant="body2" color="text.secondary">
                        Категория: {category}
                    </Typography>

                    {/* DATE */}
                    <Typography variant="body2" color="text.secondary">
                        Создано:{' '}
                        {new Date(createdAt).toLocaleDateString()}
                    </Typography>

                    {/* STATUS + PRIORITY */}
                    <Box display="flex" gap={1} flexWrap="wrap">
                        <Chip
                            size="small"
                            label={statusMap[status].label}
                            color={statusMap[status].color}
                        />

                        {priority === 'urgent' && (
                            <Chip
                                size="small"
                                label="Срочное"
                                color="error"
                                variant="outlined"
                            />
                        )}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default AdvCard;