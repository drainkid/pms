import {Grid, Typography} from "@mui/material";
import AdvCard from "../components/advCard.tsx";
import type {Advert} from "../types/advert.ts";
import {type FC, memo} from "react";
import MyCircProgress from "../components/myCircProgress.tsx";

interface AdsResponse {
    ads: Advert[]
    pagination?: {
        currentPage: number
        itemsPerPage: number
        totalItems: number
        totalPages: number
    }
}

interface AdvListProps {
    data?: AdsResponse
    isLoading: boolean
    error: Error | null
}

const AdvList: FC<AdvListProps> = memo(({ data, isLoading, error }) => {



    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', color:'black' }} >
                <MyCircProgress/>
            </div>
        )
    }

    if (error) {
        return (
            <div style={{ padding: '1rem' }}>
                <Typography color="error">
                    Произошла ошибка при загрузке объявлений. Пожалуйста, попробуйте позже.
                </Typography>
            </div>
        )
    }


    return (
        <>
            {(data?.ads.length) ? (<Grid container spacing={2}
                           m={3}
                           sx = {{justifyContent: 'center'}}
            >
                {data?.ads?.map((elem) => (
                    <AdvCard
                        advert={elem}
                        key = {elem.id}
                    />
                ))}
            </Grid>)
            : (<Typography variant={"h6"} textAlign={'center'}>
                        По вашему запросу ничего не найдено:(
            </Typography>
                )}
        </>
    )
})

export default AdvList;