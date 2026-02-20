import { /* alpha, */ Box, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import { posters } from '../../constants/constants';

function HomeCarousel() {
    return (
        <Box
            sx={{
                // borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0px 0px 64px 1px rgba(0,0,0,0.3)',
                mx: { xs: 1, md: 0 },
                height: '100%',
                minHeight: '490px',
            }}
        >
            <Carousel
                animation='fade'
                duration={1000}
                indicators={false}
                navButtonsAlwaysVisible={true}
                sx={{
                    width: '100%',
                    height: '100%', // Карусель тепер займає весь Box
                    // '& .css-1abcde-MuiPaper-root': {
                    //     // Це внутрішній клас бібліотеки (може змінюватись)
                    //     height: '100%',
                    // },
                    // // Або використовуйте універсальний селектор для всіх дітей каруселі:
                    // '& div': {
                    //     height: '100%',
                    // },
                    // height: { xs: 350, md: 490 },
                    objectFit: 'cover',
                    overflow: 'hidden',
                }}
                height='100%'
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
                // height: { xs: 350, md: 490 },
                height: '100%',
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
