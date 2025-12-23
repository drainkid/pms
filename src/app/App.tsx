import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import MainPage from "../pages/MainPage.tsx";
import './style.css'
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./queryClient.ts";

const App = () => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/list" replace />} />
                        <Route path="/list" element={<MainPage />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </div>
    );
};

export default App;