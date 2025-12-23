import {AppBar, Box, Toolbar, Typography} from "@mui/material";

const NavBar = () => {
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
                            sx={{
                                mr: 2,
                                mb: 3,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            zalupa
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default NavBar;