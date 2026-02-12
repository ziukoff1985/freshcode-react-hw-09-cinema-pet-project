import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import { useField, useFormikContext } from 'formik';

const CustomTextField = ({ name, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    return (
        <TextField
            {...field}
            {...props}
            fullWidth
            size='small'
            variant='outlined'
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            slotProps={{
                input: {
                    endAdornment: field.value && (
                        <InputAdornment position='end'>
                            <IconButton
                                edge='end'
                                size='small'
                                color='error'
                                onClick={() => setFieldValue(name, '')}
                            >
                                <ClearIcon fontSize='medium' />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default CustomTextField;
