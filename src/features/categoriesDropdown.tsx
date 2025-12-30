import {type ChangeEvent, type MouseEvent, useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Popover,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import {useSearchParams} from "react-router";

const STATUS_MAPPING = {
    'Одобрено': 'approved',
    'Отклонено': 'rejected',
    'На модерации': 'pending'
} as const;

type StatusKey = keyof typeof STATUS_MAPPING;

const STATUSES = Object.keys(STATUS_MAPPING) as StatusKey[];



export const CategoriesDropdown = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
    const [category, setCategory] = useState('')
    const [priceRange, setPriceRange] = useState<{min: string, max: string}>({min: '', max: ''});
    const [sortBy, setSortBy] = useState('newest')
    const [sortOrder, setSortOrder] = useState('desc')

    const open = Boolean(anchorEl);
    const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)

    const [, setSearchParams] = useSearchParams();


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleApplyFilters = () => {
        const params: Record<string, string> = {};
        
        if (selectedStatuses.length > 0) {
            params.status = selectedStatuses.join(',');
        }
        if (category) {
            params.categoryId = category;
        }
        if (priceRange.min) {
            params.minPrice = priceRange.min;
        }
        if (priceRange.max) {
            params.maxPrice = priceRange.max;
        }
        if (sortBy) {
            params.sortBy = sortBy;
        }
        if (sortOrder) {
            params.sortOrder = sortOrder;
        }
        
        setSearchParams(params);
        setAnchorEl(null);
    }

    const handlePriceChange = (field: 'min' | 'max', value: string) => {
        // Проверяем, что вводится число или пустое значение (для сброса лимита)
        if (value === '' || /^\d+$/.test(value)) {
            setPriceRange(prev => ({...prev, [field]: value}));
        }
    }

    const handleReset = () => {
        setSelectedStatuses([]);
        setCategory('');
        setPriceRange({min: '', max: ''})
        setSortBy('newest');
    }

    const handleSortChange = (e:ChangeEvent<HTMLInputElement>) => {

        setSortBy(e.target.value)

        if (sortBy === 'newest') {
            setSortOrder('desc')
        }
        else if (sortBy === 'oldest') {
            setSortOrder('asc')
        }
        else if (sortBy === 'price_asc') {
            setSortOrder('asc')
        }
        else if (sortBy === 'price_desc') {
            setSortOrder('desc')
        }

    }

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                    textTransform: 'none',
                    borderRadius: 4,
                    backgroundColor: '#4da3ff',
                    '&:hover': { backgroundColor: '#3395ff'},
                    mr:2,
                }}
            >
                Все категории
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{
                    sx: { p: 3, width: 320, mt: 1 }
                }}
            >
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Фильтры
                </Typography>

                <Stack spacing={3}>
                    {/* Фильтр по статусу (Multi-select) */}
                    <FormControl fullWidth size="small">
                        <InputLabel>Статус</InputLabel>
                        <Select
                            multiple
                            value={selectedStatuses}
                            onChange={
                            (e) =>
                                setSelectedStatuses(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                            input={<OutlinedInput label="Статус" />}
                            renderValue={(selected) => {
                                const getRussianName = (engValue: string) => {
                                    const found = Object.entries(STATUS_MAPPING).find(([, value]) => value === engValue);
                                    return found ? found[0] : engValue;
                                };
                                return Array.isArray(selected)
                                    ? selected.map(s => getRussianName(s)).join(', ')
                                    : getRussianName(selected);
                            }}
                        >
                            {STATUSES.map((status) => (
                                <MenuItem key={status} value={STATUS_MAPPING[status]}>
                                    <Checkbox checked={selectedStatuses.indexOf(STATUS_MAPPING[status]) > -1} />
                                    <ListItemText primary={status} />
                                </MenuItem>
                            ))}
                        </Select>   
                    </FormControl>

                    {/* Фильтр по категории */}
                    <FormControl fullWidth size="small">
                        <TextField
                            type= 'number'
                            value={category}
                            label={'Id категории'}
                            variant="outlined"
                            size={'small'}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </FormControl>

                    {/* Фильтр по диапазону цен */}
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Цена
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                fullWidth
                                size="small"
                                label="От"
                                type="number"
                                value={priceRange.min}
                                onChange={(e) => handlePriceChange('min', e.target.value)}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                label="До"
                                type="number"
                                value={priceRange.max}
                                onChange={(e) => handlePriceChange('max', e.target.value)}
                            />
                        </Stack>
                    </Box>

                    <Divider />

                    {/* Сортировка */}
                    <Box>
                        <Typography variant="subtitle2" fontWeight={600} mb={1}>
                            Сортировка
                        </Typography>
                        <RadioGroup value={sortBy} onChange={handleSortChange}>
                            <FormControlLabel value="newest" control={<Radio size="small" />} label="Сначала новые" />
                            <FormControlLabel value="oldest" control={<Radio size="small" />} label="Сначала старые" />
                            <FormControlLabel value="price_desc" control={<Radio size="small" />} label="Дешевле" />
                            <FormControlLabel value="price_asc" control={<Radio size="small" />} label="Дороже" />
                            <FormControlLabel value="priority" control={<Radio size="small" />} label="По приоритету" />
                        </RadioGroup>
                    </Box>

                    {/* Кнопки действий */}
                    <Stack direction="row" spacing={2} pt={1}>

                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            onClick={handleReset}
                            sx={{ textTransform: 'none' }}
                        >
                            Сбросить
                        </Button>

                        <Button 
                            onClick={handleApplyFilters}
                            fullWidth
                            variant="contained"
                            sx={{ textTransform: 'none', backgroundColor: '#4da3ff' }}
                        >
                            Применить
                        </Button>

                    </Stack>
                </Stack>
            </Popover>
        </>
    );
};