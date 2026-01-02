import IconButton from '@mui/material/IconButton';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh'; // Иконка солнца
import ModeNightIcon from '@mui/icons-material/ModeNight';
import {useColorScheme} from "@mui/material";

const ThemeButton = () => {

    const {mode,setMode} = useColorScheme()

    const handleToggle = () => {
        setMode(mode === 'light' ? 'dark' : 'light')
    }

    return (
        <IconButton
            onClick={handleToggle}
            color="inherit"
            aria-label={mode === "light"
                ? "Переключить на тёмный режим"
                : "Переключить на светлый режим"}
        >
            {mode === "light" ? <ModeNightIcon /> : <BrightnessHighIcon />}
        </IconButton>
    );
};

export default ThemeButton;


