import {Box, Button, Stack} from '@mui/material';
import {useNavigate, useParams} from 'react-router';
import NavBar from "../components/navBar.tsx";
import {useAdvertsById} from "../hooks/useAdvertsById.tsx";
import AdvAbout from "../features/advAbout.tsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ModeratorActions from "../features/moderatorActions.tsx";

const ItemPage = () => {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { data, isLoading, error } = useAdvertsById(id)

    const getNextAdId = (currentId: string) => {
        return String(Number(currentId) + 1)
    }

    const getPrevAdId = (currentId: string) => {
        const prevId = Number(currentId) - 1
        return prevId > 0 ? String(prevId) : null
    }

    const nextAdId = id ? getNextAdId(id) : null
    const prevAdId = id ? getPrevAdId(id) : null

    console.log(data)

    return (
        <>
            <NavBar />
            <AdvAbout data={data} isLoading={isLoading} error={error} />
            <ModeratorActions/>
            <Box sx={{ p: 2, maxWidth: 1200, mx: 'auto' }}>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                    >
                        Назад к списку
                    </Button>

                    <Box sx={{ flexGrow: 1 }} />

                    <Button
                        variant="outlined"
                        startIcon={<NavigateBeforeIcon />}
                        disabled={!prevAdId}
                        onClick={() => prevAdId && navigate(`/list/item/${prevAdId}`, { replace: true })}
                    >
                        Предыдущее
                    </Button>

                    <Button
                        variant="outlined"
                        endIcon={<NavigateNextIcon />}
                        disabled={!nextAdId}
                        onClick={() => nextAdId && navigate(`/list/item/${nextAdId}`, { replace: true })}
                    >
                        Следующее
                    </Button>
                </Stack>
            </Box>
        </>
    );
};

export default ItemPage;