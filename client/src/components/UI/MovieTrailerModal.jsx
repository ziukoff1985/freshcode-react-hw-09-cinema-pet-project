import { Dialog, DialogContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// function extractYouTubeId(url) {
//     if (!url) return null;

//     const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
//     const match = url.match(regExp);

//     return match ? match[1] : null;
// }

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
                paper: {
                    sx: {
                        bgcolor: 'black',
                        position: 'relative',
                        overflow: 'visible',
                    },
                },
            }}
        >
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: -40,
                    top: -40,
                    color: 'white',
                }}
            >
                <CloseIcon />
            </IconButton>

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
        </Dialog>
    );
}

export default MovieTrailerModal;
