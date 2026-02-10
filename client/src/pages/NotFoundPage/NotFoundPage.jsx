import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Button, Stack } from '@mui/material';

const NotFoundPage = () => {
    return (
        <Box
            sx={{
                // minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'background.paper',
            }}
        >
            <Container maxWidth='md'>
                <Stack spacing={4} alignItems='center' textAlign='center'>
                    <Box
                        component='img'
                        src='https://i.postimg.cc/2yrFyxKv/giphy.gif'
                        alt='Page not found'
                        sx={{
                            maxWidth: 360,
                            width: '100%',
                            borderRadius: 3,
                            boxShadow: 3,
                        }}
                    />

                    <Stack spacing={1}>
                        <Typography variant='h4' fontWeight='bold'>
                            This page is gone...
                        </Typography>

                        <Typography variant='body1' color='color.primary'>
                            Maybe the page you are looking for was removed,
                            renamed, or never existed.
                        </Typography>
                    </Stack>

                    <Button
                        component={RouterLink}
                        to='/'
                        variant='contained'
                        size='large'
                        sx={{
                            px: 4,
                            borderRadius: 2,
                        }}
                    >
                        Back to home
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default NotFoundPage;
