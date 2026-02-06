import { alpha, Box, Paper, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import { posters } from '../../constants/constants';

function HomeCarousel() {
    return (
        <Box
            sx={{
                // mb: 5,
                borderRadius: 2, // Більш заокруглені кути для сучасного вигляду
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                mx: { xs: 1, md: 0 },
            }}
        >
            <Carousel
                animation='fade'
                duration={1000}
                indicators={true}
                navButtonsAlwaysVisible={true}
                // Налаштування точок (індикаторів)
                indicatorIconButtonProps={{
                    style: {
                        padding: '5px',
                        color: alpha('#fff', 0.3),
                    },
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: '#fff',
                    },
                }}
                sx={{ width: '100%', height: { xs: 350, md: 530 } }}
            >
                {posters.map((item) => (
                    <CarouselItem key={item.id} item={item} />
                ))}
            </Carousel>
        </Box>
    );
}

function CarouselItem({ item }) {
    return (
        <Paper
            elevation={0}
            sx={{
                position: 'relative',
                height: { xs: 350, md: 550 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Центруємо текст вертикально
                alignItems: 'center',
                backgroundImage: `url(${item.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 25%',
                borderRadius: 0,
            }}
        >
            {/* Напівпрозорий оверлей на все зображення */}
            {/* <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.3)', // Затемнення для акценту на центрі
                }}
            /> */}

            {/* Стильний текстовий блок по центру
            <Box
                sx={{
                    position: 'relative',
                    textAlign: 'center',
                    p: 4,
                    zIndex: 2,
                    // Ефект "скляної" панелі
                    background: alpha('#000', 0.4),
                    backdropFilter: 'blur(8px)',
                    borderRadius: 4,
                    border: `1px solid ${alpha('#fff', 0.2)}`,
                    maxWidth: '80%',
                }}
            >
                <Typography
                    variant='h2'
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: '2.2rem', md: '4rem' },
                        color: 'white',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        mb: 0,
                    }}
                >
                    {item.title}
                </Typography>

                <Typography
                    variant='h6'
                    sx={{
                        color: alpha('#fff', 0.7),
                        fontWeight: 300,
                        letterSpacing: '0.3em',
                        mt: 1,
                    }}
                >
                    PREMIUM COLLECTION
                </Typography>
            </Box> */}
        </Paper>
    );
}

export default HomeCarousel;
