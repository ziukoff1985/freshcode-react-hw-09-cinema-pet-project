import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import {
    Button,
    Grid,
    IconButton,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { FieldArray, Form, Formik } from 'formik';
import CustomTextField from '../UI/CustomTextField';

import { createStudio, updateStudio } from '../../store/thunks/studiosThunks';
import { clearStudioForEdit } from '../../store/slices/studiosSlice';

function StudiosForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const studioForEdit = useSelector(
        (state) => state.studiosList.studioForEdit,
    );

    const handleSubmitForm = (values, action) => {
        const formattedValues = {
            ...values,
            foundationDate: values.foundationDate
                ? dayjs(values.foundationDate).format('YYYY-MM-DD')
                : '',
        };

        if (!values.id) {
            dispatch(createStudio(formattedValues));
            action.resetForm();
        } else {
            dispatch(updateStudio(formattedValues));
        }
    };

    const handleGoBack = () => {
        if (location.pathname.includes('edit')) {
            navigate(`/studios/${studioForEdit.id}`);
            clearStudioForEdit();
        } else {
            navigate(-1);
            clearStudioForEdit();
        }
    };

    const studioValidationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        location: Yup.string().required('Location is required'),
        foundationDate: Yup.string().required('Foundation date is required'),
        movies: Yup.array()
            .of(Yup.string().required('At least one movie is required'))
            .min(1),
        logo: Yup.string().url('Invalid URL').required('Logo URL is required'),
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Formik
                initialValues={studioForEdit}
                enableReinitialize
                validationSchema={studioValidationSchema}
                onSubmit={handleSubmitForm}
            >
                {({
                    isValid,
                    values,
                    setFieldValue,
                    setFieldTouched,
                    touched,
                    errors,
                    resetForm,
                }) => (
                    <Form>
                        <Typography variant='h6' sx={{ mb: 3 }}>
                            {values.id ? 'Edit studio' : 'Add studio'}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 6 }}>
                                <CustomTextField name='title' label='Title' />
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <CustomTextField
                                    name='location'
                                    label='Location'
                                />
                            </Grid>

                            {/* DatePicker */}
                            <Grid size={{ xs: 6 }}>
                                <DatePicker
                                    label='Foundation date'
                                    format='YYYY/MM/DD'
                                    name='foundationDate'
                                    value={
                                        values.foundationDate
                                            ? dayjs(values.foundationDate)
                                            : null
                                    }
                                    onChange={(newValue) =>
                                        setFieldValue(
                                            'foundationDate',
                                            newValue,
                                        )
                                    }
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            size: 'small',
                                            onBlur: () =>
                                                setFieldTouched(
                                                    'foundationDate',
                                                    true,
                                                ),
                                            error:
                                                touched.foundationDate &&
                                                !!errors.foundationDate,
                                            helperText:
                                                touched.foundationDate &&
                                                errors.foundationDate,
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <CustomTextField name='logo' label='Logo URL' />
                            </Grid>

                            {/* <Grid size={{ xs: 12 }}>
                                <CustomTextField
                                    name='image'
                                    label='Image URL'
                                />
                            </Grid> */}

                            <Grid size={{ xs: 12 }}>
                                <Typography variant='subtitle2'>
                                    Movies List - min 1 movie:
                                </Typography>
                                <FieldArray name='movies'>
                                    {({ push, remove }) => (
                                        <Stack spacing={1} mt={1}>
                                            {values.movies.map((_, index) => (
                                                <Stack
                                                    key={index}
                                                    direction='row'
                                                    spacing={1}
                                                >
                                                    <CustomTextField
                                                        name={`movies.${index}`}
                                                        label={`Movie #${index + 1}`}
                                                    />
                                                    <IconButton
                                                        color='error'
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                        disabled={
                                                            values.movies
                                                                .length === 1
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Stack>
                                            ))}
                                            <Button
                                                startIcon={<AddCircleIcon />}
                                                variant='outlined'
                                                onClick={() => push('')}
                                                fullWidth
                                                size='small'
                                                sx={{
                                                    alignSelf: 'flex-start',
                                                }}
                                            >
                                                Add Movie
                                            </Button>
                                        </Stack>
                                    )}
                                </FieldArray>
                            </Grid>

                            <Grid size={{ xs: 4 }}>
                                <Button
                                    variant='contained'
                                    color='success'
                                    fullWidth
                                    type='submit'
                                    disabled={!isValid}
                                    startIcon={<SaveIcon />}
                                >
                                    {values.id ? 'Update' : 'Save'}
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 4 }}>
                                <Button
                                    onClick={handleGoBack}
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    startIcon={<UndoIcon />}
                                >
                                    Go Back
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 4 }}>
                                <Button
                                    disabled={location.pathname.includes(
                                        'edit',
                                    )}
                                    onClick={() => {
                                        resetForm();
                                    }}
                                    variant='contained'
                                    color='error'
                                    fullWidth
                                    startIcon={<RestartAltIcon />}
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </LocalizationProvider>
    );
}

export default StudiosForm;
