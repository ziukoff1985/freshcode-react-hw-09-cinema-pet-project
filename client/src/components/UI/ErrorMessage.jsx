import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function ErrorMessage({ error, btnText, from }) {
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
            <Button
                component={Link}
                to={from}
                variant='contained'
                size='large'
                sx={{
                    mt: 10,
                    px: 4,
                    borderRadius: 2,
                }}
            >
                {btnText}
            </Button>
        </Box>
    );
}

export default ErrorMessage;
