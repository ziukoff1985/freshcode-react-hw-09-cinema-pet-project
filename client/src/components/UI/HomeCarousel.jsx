import { alpha, Box, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import { posters } from '../../constants/constants';

function HomeCarousel() {
    return (
        <Box
            sx={{
                borderRadius: 2,
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
                sx={{
                    width: '100%',
                    height: { xs: 350, md: 490 },
                    objectFit: 'cover',
                    overflow: 'hidden',
                }}
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
                height: { xs: 350, md: 490 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${item.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 0,
            }}
        ></Paper>
    );
}

export default HomeCarousel;
