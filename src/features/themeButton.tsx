import {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh'; // Иконка солнца
import ModeNightIcon from '@mui/icons-material/ModeNight';
import {useColorScheme} from "@mui/material";

const ThemeButton = () => {
    // Используем хук useState для управления состоянием темы. По умолчанию - светлая тема (true).
    const [isLightMode, setIsLightMode] = useState(true);

    const {setMode} = useColorScheme()


    const handleToggle = () => {
        setIsLightMode(!isLightMode)
        if (isLightMode) {
            setMode('light')
        }
        else {
            setMode('dark')
        }
    };

    return (
        <IconButton
            onClick={handleToggle}
            color="inherit"
            aria-label={isLightMode ? 'Переключить на темный режим' : 'Переключить на светлый режим'}
        >
            {(localStorage.getItem('mui-mode') === 'light') ? <BrightnessHighIcon /> : <ModeNightIcon />}
        </IconButton>
    );
};

export default ThemeButton;