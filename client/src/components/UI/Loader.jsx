import { Box, CircularProgress } from '@mui/material';

function Loader() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
            }}
        >
            <CircularProgress size={60} thickness={4} />
        </Box>
    );
}

export default Loader;
