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

import { createMovie, updateMovie } from '../../store/thunks/moviesThunks';
import { clearMovieForEdit } from '../../store/slices/moviesSlice';

function MoviesForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const movieForEdit = useSelector((state) => state.moviesList.movieForEdit);

    const handleSubmitForm = (values, action) => {
        const formattedValues = {
            ...values,
            releaseDate: values.releaseDate
                ? dayjs(values.releaseDate).format('YYYY-MM-DD')
                : '',
        };

        if (!values.id) {
            dispatch(createMovie(formattedValues));
            action.resetForm();
        } else {
            dispatch(updateMovie(formattedValues));
        }
    };

    const handleGoBack = () => {
        if (location.pathname.includes('edit')) {
            navigate(`/movies/${movieForEdit.id}`);
            clearMovieForEdit();
        } else {
            navigate(-1);
            clearMovieForEdit();
        }
    };

    const movieValidationShema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        country: Yup.string().required('Country is required'),
        directors: Yup.array()
            .of(Yup.string().required('At least one director is required'))
            .min(1),
        actors: Yup.array()
            .of(Yup.string().required('At least one actor is required'))
            .min(1),
        studios: Yup.array()
            .of(Yup.string().required('At least one studio is required'))
            .min(1),
        releaseDate: Yup.string().required('Release date is required'),
        poster: Yup.string()
            .url('Invalid URL')
            .required('Poster URL is required'),
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Formik
                initialValues={movieForEdit}
                enableReinitialize
                validationSchema={movieValidationShema}
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
                            {values.id ? 'Edit movie' : 'Add movie'}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 6 }}>
                                <CustomTextField name='title' label='Title' />
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <CustomTextField
                                    name='country'
                                    label='Country'
                                />
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <CustomTextField
                                    name='poster'
                                    label='Poster URL'
                                />
                            </Grid>

                            {/* DatePicker */}
                            <Grid size={{ xs: 6 }}>
                                <DatePicker
                                    label='Release date'
                                    format='YYYY/MM/DD'
                                    name='releaseDate'
                                    value={
                                        values.releaseDate
                                            ? dayjs(values.releaseDate)
                                            : null
                                    }
                                    onChange={(newValue) =>
                                        setFieldValue('releaseDate', newValue)
                                    }
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            size: 'small',
                                            onBlur: () =>
                                                setFieldTouched(
                                                    'releaseDate',
                                                    true,
                                                ),
                                            error:
                                                touched.releaseDate &&
                                                !!errors.releaseDate,
                                            helperText:
                                                touched.releaseDate &&
                                                errors.releaseDate,
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Directors */}
                            <Grid size={{ xs: 12 }}>
                                <Typography variant='subtitle2'>
                                    Directors list:
                                </Typography>
                                <FieldArray name='directors'>
                                    {({ push, remove }) => (
                                        <Stack spacing={1} mt={1}>
                                            {values.directors.map(
                                                (_, index) => (
                                                    <Stack
                                                        key={index}
                                                        direction='row'
                                                        spacing={1}
                                                    >
                                                        <CustomTextField
                                                            name={`directors.${index}`}
                                                            label={`Director #${index + 1}`}
                                                        />
                                                        <IconButton
                                                            color='error'
                                                            onClick={() =>
                                                                remove(index)
                                                            }
                                                            disabled={
                                                                values.directors
                                                                    .length ===
                                                                1
                                                            }
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Stack>
                                                ),
                                            )}
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
                                                Add director
                                            </Button>
                                        </Stack>
                                    )}
                                </FieldArray>
                            </Grid>

                            {/* Actors */}
                            <Grid size={{ xs: 12 }}>
                                <Typography variant='subtitle2'>
                                    Actors list:
                                </Typography>
                                <FieldArray name='actors'>
                                    {({ push, remove }) => (
                                        <Stack spacing={1} mt={1}>
                                            {values.actors.map((_, index) => (
                                                <Stack
                                                    key={index}
                                                    direction='row'
                                                    spacing={1}
                                                >
                                                    <CustomTextField
                                                        name={`actors.${index}`}
                                                        label={`Actor #${index + 1}`}
                                                    />
                                                    <IconButton
                                                        color='error'
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                        disabled={
                                                            values.actors
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
                                                Add actor
                                            </Button>
                                        </Stack>
                                    )}
                                </FieldArray>
                            </Grid>

                            {/* Studios */}
                            <Grid size={{ xs: 12 }}>
                                <Typography variant='subtitle2'>
                                    Studios list:
                                </Typography>
                                <FieldArray name='studios'>
                                    {({ push, remove }) => (
                                        <Stack spacing={1} mt={1}>
                                            {values.studios.map((_, index) => (
                                                <Stack
                                                    key={index}
                                                    direction='row'
                                                    spacing={1}
                                                >
                                                    <CustomTextField
                                                        name={`studios.${index}`}
                                                        label={`Studio #${index + 1}`}
                                                    />
                                                    <IconButton
                                                        color='error'
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                        disabled={
                                                            values.studios
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
                                                Add studio
                                            </Button>
                                        </Stack>
                                    )}
                                </FieldArray>
                            </Grid>

                            {/* Buttons */}
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

export default MoviesForm;
