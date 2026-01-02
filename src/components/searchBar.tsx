import {Box, Button, TextField} from '@mui/material';

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
};

 const SearchBar = ({ value, onChange, onSubmit }: SearchBarProps) => {

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                maxWidth: 900,
                borderRadius: '20px',
                overflow: 'hidden',
                border: '2px solid #4da3ff',
            }}
        >
            <TextField
                fullWidth
                value={value}
                placeholder="Поиск по объявлениям"
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                variant="outlined"
                sx={{
                    height: 54,
                    borderRadius: 0,
                    '& fieldset': { border: 'none' },
                    fontSize: 13,
                    paddingLeft: 2,
                }}
            />

            <Button
                variant="contained"
                onClick={onSubmit}
                sx={{
                    width: 140,
                    borderRadius: 0,
                    fontSize: 15,
                    textTransform: 'none',
                    backgroundColor: '#4da3ff',
                    '&:hover': {
                        backgroundColor: '#3395ff',
                    },
                }}
            >
                Найти
            </Button>
        </Box>
    );
};

 export default SearchBar;
