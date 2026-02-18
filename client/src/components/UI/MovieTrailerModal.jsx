import {
    Dialog,
    DialogContent,
    IconButton,
    Box,
    Fade,
    keyframes,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// function extractYouTubeId(url) {
//     if (!url) return null;

//     const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
//     const match = url.match(regExp);

//     return match ? match[1] : null;
// }

// 🎬 Zoom-in animation
const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

function MovieTrailerModal({ open, onClose, trailerUrl }) {
    // const videoId = extractYouTubeId(trailerUrl);

    const embedUrl = `${trailerUrl}?autoplay=1&mute=0&rel=0`;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth='md'
            fullWidth
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(6px)', // 🔥 cinematic blur
                        backgroundColor: 'rgba(0,0,0,0.7)',
                    },
                },
                paper: {
                    sx: {
                        bgcolor: 'black',
                        position: 'relative',
                        overflow: 'visible',
                        borderRadius: 4,
                    },
                },
            }}
        >
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: -50,
                    top: -50,
                    color: 'white',
                    zIndex: 10,
                }}
            >
                <CloseIcon fontSize='large' />
            </IconButton>

            <DialogContent sx={{ p: 0, lineHeight: 0 }}>
                <Box
                    sx={{
                        position: 'relative',
                        pt: '56.25%', // 16:9
                        overflow: 'hidden',
                    }}
                >
                    {embedUrl && (
                        <Fade in={open} timeout={5000}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    animation: `${zoomIn} 500ms ease-out`,
                                }}
                            >
                                <iframe
                                    src={embedUrl}
                                    title='Movie Trailer'
                                    allow='autoplay; encrypted-media'
                                    allowFullScreen
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        border: 0,
                                    }}
                                />
                            </Box>
                        </Fade>
                    )}
                </Box>
            </DialogContent>

            {/* <Fade in={open} timeout={400}>
                <DialogContent sx={{ p: 0, lineHeight: 0 }}>
                    <Box
                        sx={{
                            position: 'relative',
                            pt: '56.25%',
                        }}
                    >
                        {embedUrl && (
                            <iframe
                                src={embedUrl}
                                title='Movie Trailer'
                                allow='autoplay; encrypted-media'
                                allowFullScreen
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 0,
                                }}
                            />
                        )}
                    </Box>
                </DialogContent>
            </Fade> */}
        </Dialog>
    );
}

export default MovieTrailerModal;
