import { Box, Typography } from '@mui/material';

function Error({ error }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 5,
            }}
        >
            <Typography variant='text'>Oops! Something went wrong</Typography>
            <Typography variant='text'>{error}</Typography>
        </Box>
    );
}

export default Error;
