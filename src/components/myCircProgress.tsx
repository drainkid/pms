import {CircularProgress} from "@mui/material";

const MyCircProgress = () => {
    return (
        <>
            <CircularProgress sx = {(localStorage.getItem('mui-mode') ==='light') ? {color:'black'} : {color: 'white'}} />

        </>
    );
};

export default MyCircProgress;