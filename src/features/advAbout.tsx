import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";


interface ModerationHistoryItem {
    id: string
    action: 'approved' | 'rejected' | 'requestChanges'
    moderatorName: string
    timestamp: string
    reason?: string
    comment?: string
}

interface Seller {
    name?: string
    rating?: number
    totalAds?: number
    registeredAt?: string | null
}

interface AdvAboutProps {
    data: {
        id?: string
        images?: string[]
        description?: string
        characteristics?: Record<string, string | number | boolean>
        seller?: Seller
        moderationHistory?: ModerationHistoryItem[]
    };
    isLoading: boolean
    error: Error | null
}


const AdvAbout = ({data, isLoading, error}: AdvAboutProps) => {

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', color:'black' }} >
                <CircularProgress sx = {(localStorage.getItem('mui-mode') ==='light') ? {color:'black'} : {color: 'white'}} />
            </div>
        )
    }

    if (error) {
        return (
            <div style={{ padding: '1rem' }}>
                <Typography color="error">
                    Произошла ошибка при загрузке объявлений. Пожалуйста, попробуйте позже.
                </Typography>
            </div>
        )
    }

    const formatDate = (isoDate: string | null | undefined): string => {
        if (!isoDate) return '—'
        const date = new Date(isoDate)
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const statusMap = {
        approved: 'Одобрено',
        rejected: 'Отклонено',
        requestChanges: 'Возвращено на доработку'
    } as const

    return (
        <>
            <Box p={3}>
                <Grid container spacing={3} sx = {{justifyContent: 'center'}}>
                    {/* Левая колонка */}
                    <Grid >
                        {/* Галерея */}
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Галерея
                                </Typography>

                                <Grid container spacing={2}>
                                    {data?.images?.map((src: string, index: number) => (
                                        <Grid  key={index}>
                                            <CardMedia
                                                component="img"
                                                height="160"
                                                image={src}
                                                sx={{ borderRadius: 1 }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Описание */}
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Полное описание
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {data?.description}
                                </Typography>
                            </CardContent>
                        </Card>

                        {/* Характеристики */}
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Характеристики
                                </Typography>

                                <Table size="small">
                                    <TableBody>
                                        {Object.entries(data?.characteristics ?? {}).map(([key, value]) => (
                                            <TableRow key={key}>
                                                <TableCell sx={{ fontWeight: 500 }}>
                                                    {key}
                                                </TableCell>
                                                <TableCell>{value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Правая колонка */}
                    <Grid>
                        {/* Продавец */}
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Продавец
                                </Typography>

                                <Stack spacing={1}>
                                    <Typography>Имя: <b>{data?.seller?.name}</b></Typography>
                                    <Typography>Рейтинг: ⭐ {data?.seller?.rating}</Typography>
                                    <Typography>Объявлений: {data?.seller?.totalAds}</Typography>
                                    <Typography>
                                        На сайте с: {formatDate(data?.seller?.registeredAt)}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* История модерации */}
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    История модерации
                                </Typography>
                                <Stack spacing={2}>
                                    {data?.moderationHistory?.map((field) => (
                                        <Box key={field.id}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={statusMap[field.action]}
                                                    color={
                                                        field.action === 'approved'
                                                            ? 'success'
                                                            : field.action === 'requestChanges'
                                                                ? 'warning'
                                                                : 'error'
                                                    }
                                                    size="small"
                                                />
                                                <Stack spacing={1}>
                                                    <Typography variant="body2" >
                                                        Имя: {field.moderatorName}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Время: {formatDate(field.timestamp)}
                                                    </Typography>
                                                    {field.reason
                                                        ?
                                                        <Typography variant="body2" >
                                                            Решение {field.reason}
                                                        </Typography>
                                                        :
                                                        null
                                                    }
                                                    <Typography variant="body2" >
                                                        Комментарий: {field.comment}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default AdvAbout;