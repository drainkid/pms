import {CircularProgress} from "@mui/material";

const MyCircProgress = ({...props}) => {
    return (
        <>
            <CircularProgress sx = {(localStorage.getItem('mui-mode') ==='light') ? {color:'black'} : {color: 'white'}} {...props}/>

        </>
    );
};

export default MyCircProgress;