import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import MainPage from "../pages/MainPage.tsx";
import './style.css'
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./queryClient.ts";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import ItemPage from "../pages/ItemPage.tsx";


const App = () => {

    
    const theme = createTheme({
        colorSchemes: {
            dark: true,
        },
    });
    
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Navigate to="/list" replace />} />
                            <Route path="/list" element={<MainPage />} />
                            <Route path="/list/item/:id" element={<ItemPage />} />
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </QueryClientProvider>
        </div>
    );
};

export default App;