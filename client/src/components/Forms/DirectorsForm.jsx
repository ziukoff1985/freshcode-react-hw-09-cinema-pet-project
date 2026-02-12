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

import {
    createDirector,
    updateDirector,
} from '../../store/thunks/directorsThunks';
import { clearDirectorForEdit } from '../../store/slices/directorsSlice';

function DirectorsForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const directorForEdit = useSelector(
        (state) => state.directorsList.directorForEdit,
    );

    const handleSubmitForm = (values, action) => {
        const formattedValues = {
            ...values,
            birthDate: values.birthDate
                ? dayjs(values.birthDate).format('YYYY-MM-DD')
                : '',
        };

        if (!values.id) {
            dispatch(createDirector(formattedValues));
            action.resetForm();
        } else {
            dispatch(updateDirector(formattedValues));
        }
    };

    const handleGoBack = () => {
        if (location.pathname.includes('edit')) {
            navigate(`/directors/${directorForEdit.id}`);
            clearDirectorForEdit();
        } else {
            navigate(-1);
            clearDirectorForEdit();
        }
    };

    const directorValidationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        birthDate: Yup.date().required('Birth date is required'),
        nationality: Yup.string().required('Nationality is required'),
        image: Yup.string()
            .url('Invalid URL')
            .required('Image URL is required'),
        movies: Yup.array()
            .of(Yup.string().required('Movie name is required'))
            .min(1),
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Formik
                initialValues={directorForEdit}
                enableReinitialize
                validationSchema={directorValidationSchema}
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
                            {values.id ? 'Edit director' : 'Add director'}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 6 }}>
                                <CustomTextField
                                    name='firstName'
                                    label='First Name'
                                />
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <CustomTextField
                                    name='lastName'
                                    label='Last Name'
                                />
                            </Grid>

                            {/* DatePicker */}
                            <Grid size={{ xs: 6 }}>
                                <DatePicker
                                    label='Birth Date'
                                    format='YYYY/MM/DD'
                                    name='birthDate'
                                    value={
                                        values.birthDate
                                            ? dayjs(values.birthDate)
                                            : null
                                    }
                                    onChange={(newValue) =>
                                        setFieldValue('birthDate', newValue)
                                    }
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            size: 'small',
                                            onBlur: () =>
                                                setFieldTouched(
                                                    'birthDate',
                                                    true,
                                                ),
                                            error:
                                                touched.birthDate &&
                                                !!errors.birthDate,
                                            helperText:
                                                touched.birthDate &&
                                                errors.birthDate,
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <CustomTextField
                                    name='nationality'
                                    label='Nationality'
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <CustomTextField
                                    name='image'
                                    label='Image URL'
                                />
                            </Grid>

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

export default DirectorsForm;
