import {Card, CardContent, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {useSearchParams} from "react-router";
import {useEffect, useState} from "react";

const PeriodFilters = () => {

    const [searchParams,setSearchParams] = useSearchParams()
    const [selectedButton, setSelectedButton] = useState<string | null>(null)
    const [startDate, setStartDate] = useState<string | null>('')
    const [endDate, setEndDate] = useState<string | null>('')

    useEffect(() => {
        if (selectedButton === 'custom' && startDate && endDate) {
            setSearchParams({
                period: 'custom',
                startDate: startDate,
                endDate: endDate
            });
        } else if (selectedButton) {
            setSearchParams({ period: selectedButton });
        }

    }, [selectedButton, startDate, endDate, searchParams, setSearchParams])


    return (
        <>
            {/* Период */}
            <Card>
                <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="body2" fontWeight={300}>
                            Период:
                        </Typography>
                        <ToggleButtonGroup
                            exclusive size="small"
                            value = {selectedButton}
                            onChange={(_e, value) => setSelectedButton(value)}
                        >
                            <ToggleButton value="today">Сегодня</ToggleButton>
                            <ToggleButton value="week">Неделя</ToggleButton>
                            <ToggleButton value="month">Месяц</ToggleButton>
                            <ToggleButton value="custom">Задать период</ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>

                    {/* Кастомный период */}
                    {selectedButton === "custom" && (
                        <Stack direction={{ xs: "column", sm: "row" }} sx= {{mt:3}} spacing={2}>
                            <TextField
                                label={'Начало периода'}
                                type="date"
                                size="medium"
                                fullWidth
                                slotProps = {{inputLabel: {shrink: true}}}
                                onChange={(e) => setStartDate(e.target.value)}

                            />
                            <TextField
                                type="date"
                                label={'Конец периода'}
                                size="medium"
                                fullWidth
                                slotProps = {{inputLabel: {shrink: true}}}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Stack>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default PeriodFilters;