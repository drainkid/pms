import NavBar from "../components/navBar.tsx";
import SearchBar from "../components/searchBar.tsx";
import {type ChangeEvent, useState} from "react";
import AdvList from "../features/advList.tsx";
import {Box, Pagination} from "@mui/material";
import {useAdverts} from "../hooks/useAdverts.tsx";


const MainPage = () => {

    const [search, setSearch] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1)

    const {data} = useAdverts()

    const changePage = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const handleSearch = () => {
        setPage(1)
        setSearchValue(search)
    }


    return (
        <>
            <NavBar/>
            <Box component={'div'}  sx={{display:'flex', justifyContent:'space-around', mt:4, mb:4}}>
                <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch}/>
            </Box>
            <AdvList page={page} search={searchValue}/>
            <Box component={'div'}  sx={{display:'flex', justifyContent:'space-around', mt:4, mb:4}}>
                <Pagination count = {data?.pagination?.totalPages} page={page} onChange={changePage}/>
            </Box>
        </>
    );
};

export default MainPage;