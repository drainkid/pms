import {Box, TextField} from '@mui/material';
import {CategoriesDropdown} from "../features/categoriesDropdown.tsx";

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
            <CategoriesDropdown/>
        </Box>
    );
};

 export default SearchBar;
