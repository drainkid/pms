import {CircularProgress, Grid, Typography} from "@mui/material";
import AdvCard from "../components/advCard.tsx";
import type {Advert} from "../../types/advert.ts";
import type {FC} from "react";

interface AdsResponse {
    ads: Advert[];
    pagination?: {
        currentPage: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
    };
}

interface AdvListProps {
    data?: AdsResponse;
    isLoading: boolean;
    error: Error | null;
}

const AdvList: FC<AdvListProps> = ({ data, isLoading, error }) => {



    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', color:'black' }} >
                <CircularProgress sx = {(localStorage.getItem('mui-mode') ==='light') ? {color:'black'} : {color: 'white'}} />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '1rem' }}>
                <Typography color="error">
                    Произошла ошибка при загрузке объявлений. Пожалуйста, попробуйте позже.
                </Typography>
            </div>
        );
    }

    return (
        <>
            <Grid container spacing={2}
                  m={3}
                  sx = {{justifyContent: 'center'}}
            >
                {data?.ads?.map((elem) => (
                    <AdvCard advert={elem} key = {elem.id}/>
                ))}
            </Grid>
        </>
    );
};

export default AdvList;