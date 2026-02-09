import { Drawer, Box, Typography, Button, Stack } from '@mui/material';

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
                }}
            >
                <Typography variant='h6' textAlign='center'>
                    {title}
                </Typography>

                {description && (
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        textAlign='center'
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
