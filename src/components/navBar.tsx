import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import ThemeButton from "../features/themeButton.tsx";

const NavBar = () => {

    const navigate = useNavigate()

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static"
                        sx={{
                            backgroundColor:'#262525',
                            height:'40px'
                        }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            onClick={() => navigate('/')}
                            sx={{
                                mr: 2,
                                mb: 3,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: 'pointer'
                        }}
                            >
                                eagle
                        </Typography>

                        <Box sx={{ marginLeft: 'auto', mb: 3 }}>
                            <ThemeButton />
                        </Box>

                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default NavBar;