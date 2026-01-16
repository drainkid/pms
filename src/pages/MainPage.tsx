import NavBar from "../components/navBar.tsx";
import SearchBar from "../components/searchBar.tsx";
import {type ChangeEvent, useMemo, useState} from "react";
import AdvList from "../features/advList.tsx";
import {Box, Pagination, Typography} from "@mui/material";
import {useAdverts} from "../hooks/useAdverts.tsx";
import {useSearchParams} from "react-router";


const MainPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const initialSearch = searchParams.get('search') ?? ''
    const initialPage = Math.max(1, Number(searchParams.get('page') ?? 1))

    const [search, setSearch] = useState(initialSearch)
    const [searchValue, setSearchValue] = useState(initialSearch)
    const [page, setPage] = useState(initialPage)

    const filters = useMemo(() => {
        return Object.fromEntries(searchParams)
    }, [searchParams])

    const {data, isLoading, error} = useAdverts({search: searchValue, ...filters})

    const changePage = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value)
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set('page', String(value))
        setSearchParams(newSearchParams)
    }

    const handleSearch = () => {
        setPage(1)
        setSearchValue(search)
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set('search', search)
        newSearchParams.set('page', '1')
        setSearchParams(newSearchParams)
    }

    return (
        <>
            <NavBar/>
            <Box component={'div'}
                 sx={{display:'flex',
                     justifyContent:'center',
                     flexWrap: 'wrap',
                     mt:4,
                     mb:4,
            }}>
                <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch}/>
            </Box>

            <AdvList
                data = {data}
                isLoading = {isLoading}
                error = {error}
            />

            <Box component={'div'}
                 sx={{display:'flex',
                     flexDirection: 'column',
                     flexWrap: 'wrap',
                     alignItems: 'center',
                     alignContent: 'center',
                     mt:4,
                     mb:4}}>
                <Pagination count = {data?.pagination?.totalPages} page={page} onChange={changePage}/>
                <Typography variant="body1" fontWeight={100}> Всего объявлений: {data?.pagination?.totalItems} </Typography>
            </Box>
        </>
    );
};

export default MainPage;