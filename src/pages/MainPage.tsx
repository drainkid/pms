import NavBar from "../components/navBar.tsx";
import SearchBar from "../components/searchBar.tsx";
import {type ChangeEvent, useMemo, useState} from "react";
import AdvList from "../features/advList.tsx";
import {Box, Pagination, Typography} from "@mui/material";
import {useAdverts} from "../hooks/useAdverts.tsx";
import {CategoriesDropdown} from "../features/categoriesDropdown.tsx";
import {useSearchParams} from "react-router";


const MainPage = () => {

    const [search, setSearch] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)

    const [searchParams, setSearchParams] = useSearchParams()

    const filters = useMemo(() => {
        return Object.fromEntries(searchParams)
    }, [searchParams])


    const {data, isLoading, error} = useAdverts({page, search: searchValue, ...filters})

    const changePage = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const handleSearch = () => {
        setPage(1)
        setSearchValue(search)
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set('search', search)
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
                <CategoriesDropdown/>
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