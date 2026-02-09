import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box
            sx={{
                mt: 'auto',
                p: 3,
                textAlign: 'center',
                color: 'white',
            }}
        >
            <Typography variant='boy2'>© 2026 CinemaLab</Typography>
        </Box>
    );
}

export default Footer;
