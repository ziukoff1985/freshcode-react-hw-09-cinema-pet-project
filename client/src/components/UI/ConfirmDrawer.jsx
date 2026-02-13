import { Drawer, Box, Typography, Button, Stack, Divider } from '@mui/material';

function ConfirmDrawer({
    open,
    title = 'Confirm action',
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onClose,
}) {
    return (
        <Drawer anchor='right' open={open} onClose={onClose}>
            <Box
                sx={{
                    width: { xs: '100vw', sm: 360 },
                    p: 3,
                    textAlign: 'center',
                }}
            >
                <Typography variant='h6' fontSize='24px'>
                    {title}
                </Typography>
                
                <Divider sx={{ my: 3, opacity: 0.9 }} />


                {description && (
                    <Typography
                        variant='body2'
                        fontSize='16px'
                        color='text.secondary'
                        mt={1}
                        mb={3}
                    >
                        {description}
                    </Typography>
                )}

                <Stack direction='row' spacing={2} justifyContent='center'>
                    <Button onClick={onClose}>{cancelText}</Button>
                    <Button
                        onClick={onConfirm}
                        variant='contained'
                        color='error'
                    >
                        {confirmText}
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
}

export default ConfirmDrawer;
