import {AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {type MouseEvent, useState} from "react";
import {useNavigate} from "react-router";
import MenuIcon from '@mui/icons-material/Menu';
import ThemeButton from "../features/themeButton.tsx";

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate()

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleNavigate = (path: string) => {
        navigate(path)
        handleMenuClose()
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar 
                position="static"
                sx={{
                    backgroundColor: '#262525',
                    height: '64px'
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => handleNavigate('/list')}
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            flexGrow: 1,
                            '&:hover': {
                                color: 'primary.main'
                            }
                        }}
                    >
                        pms
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                        <Button
                            color="inherit"
                            onClick={() => navigate('/stats')}
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                textTransform: 'none'
                            }}
                        >
                            stats
                        </Button>
                        <ThemeButton />
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                        <ThemeButton />
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                            sx={{ ml: 1 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: '#262525'
                                }
                            }}
                        >
                            <MenuItem 
                                onClick={() => handleNavigate('/list')}
                                sx={{ 
                                    color: 'inherit',
                                    fontFamily: 'monospace',
                                    fontWeight: 700
                                }}
                            >
                                pms
                            </MenuItem>
                            <MenuItem 
                                onClick={() => handleNavigate('/stats')}
                                sx={{ 
                                    color: 'inherit',
                                    fontFamily: 'monospace',
                                    fontWeight: 700
                                }}
                            >
                                stats
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;
