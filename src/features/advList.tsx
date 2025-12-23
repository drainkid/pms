import {useAdverts} from "../hooks/useAdverts.tsx";
import {CircularProgress, Grid, Typography} from "@mui/material";
import AdvCard from "../components/advCard.tsx";


const AdvList = ({page, search}: {page?:number, search?:string}) => {

    const {data, isLoading, error} = useAdverts({page, search})

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', color:'black' }} >
                <CircularProgress sx = {{color:'black'}} />
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
            <Grid container spacing={2}
                  m={3}
                  sx = {{justifyContent: 'center'}}
            >
                {data?.ads?.map((elem) => (
                    <AdvCard advert={elem} key = {elem.id}/>
                ))}
            </Grid>
    );
};

export default AdvList;