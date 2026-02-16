import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import {
    Button,
    Grid,
    IconButton,
    Paper,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { FieldArray, Form, Formik } from 'formik';
import CustomTextField from '../UI/CustomTextField';

import { createMovie, updateMovie } from '../../store/thunks/moviesThunks';
// import { clearMovieForEdit } from '../../store/slices/moviesSlice';
import { useState } from 'react';

const steps = ['Main info', 'Details', 'Directors', 'Actors', 'Studios'];

function MoviesForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [activeStep, setActiveStep] = useState(0);

    const movieForEdit = useSelector((state) => state.moviesList.movieForEdit);

    const movieValidationSchema = [
        Yup.object({
            title: Yup.string().required('First name is required'),
            country: Yup.string().required('Last name is required'),
        }),
        Yup.object({
            releaseDate: Yup.string().required('Birth date is required'),
            poster: Yup.string()
                .url('Invalid poster URL')
                .required('Poster URL is required'),
        }),
        Yup.object({
            directors: Yup.array()
                .of(Yup.string().required('At least one actor is required'))
                .min(1),
        }),
        Yup.object({
            actors: Yup.array()
                .of(Yup.string().required('At least one director is required'))
                .min(1),
        }),
        Yup.object({
            studios: Yup.array()
                .of(Yup.string().required('At least one studio is required'))
                .min(1),
        }),
    ];

    const currentValidationSchema = movieValidationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    // const handleNext = (validateForm) => {
    //     validateForm().then((errors) => {
    //         if (Object.keys(errors).length === 0) {
    //             setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //         }
    //     });
    // };

    const handleNext = async (e, validateForm) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Валідуємо форму
        const errors = await validateForm();

        // Перевіряємо помилки ТІЛЬКИ для полів поточного кроку
        const currentStepFields = Object.keys(
            movieValidationSchema[activeStep].fields,
        );
        const hasErrorsInCurrentStep = currentStepFields.some(
            (field) => !!errors[field],
        );

        if (!hasErrorsInCurrentStep) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleSubmitForm = (values /* , action */) => {
        const formattedValues = {
            ...values,
            releaseDate: values.releaseDate
                ? dayjs(values.releaseDate).format('YYYY-MM-DD')
                : '',
        };

        if (!values.id) {
            dispatch(createMovie(formattedValues));
            // action.resetForm();
            navigate('/movies');
            setActiveStep(0);
        } else {
            dispatch(updateMovie(formattedValues));
            navigate(`/movies/${movieForEdit.id}`);
            setActiveStep(0);
        }
    };

    // const handleGoBack = () => {
    //     if (location.pathname.includes('edit')) {
    //         navigate(`/movies/${movieForEdit.id}`);
    //         clearMovieForEdit();
    //     } else {
    //         navigate(-1);
    //         clearMovieForEdit();
    //     }
    // };

    // * Old validation without Stepper
    // const movieValidationShema = Yup.object().shape({
    //     title: Yup.string().required('Title is required'),
    //     country: Yup.string().required('Country is required'),
    //     directors: Yup.array()
    //         .of(Yup.string().required('At least one director is required'))
    //         .min(1),
    //     actors: Yup.array()
    //         .of(Yup.string().required('At least one actor is required'))
    //         .min(1),
    //     studios: Yup.array()
    //         .of(Yup.string().required('At least one studio is required'))
    //         .min(1),
    //     releaseDate: Yup.string().required('Release date is required'),
    //     poster: Yup.string()
    //         .url('Invalid URL')
    //         .required('Poster URL is required'),
    // });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Formik
                initialValues={structuredClone(movieForEdit)}
                enableReinitialize
                validationSchema={currentValidationSchema}
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
                    validateForm,
                }) => (
                    <Form>
                        <Typography variant='h6' sx={{ mb: 3 }}>
                            {values.id ? 'Edit movie' : 'Add movie'}
                        </Typography>
                        <Grid container spacing={2}>
                            {/* Step 1 */}
                            {activeStep === 0 && (
                                <>
                                    <Grid size={{ xs: 6 }}>
                                        <CustomTextField
                                            name='title'
                                            label='Title'
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 6 }}>
                                        <CustomTextField
                                            name='country'
                                            label='Country'
                                        />
                                    </Grid>
                                </>
                            )}

                            {/* Step 2 */}
                            {activeStep === 1 && (
                                <>
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
                                                setFieldValue(
                                                    'releaseDate',
                                                    newValue,
                                                )
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
                                </>
                            )}

                            {/* Step 3 */}
                            {/* Directors */}
                            {activeStep === 2 && (
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
                                                                    remove(
                                                                        index,
                                                                    )
                                                                }
                                                                disabled={
                                                                    values
                                                                        .directors
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
                                                    startIcon={
                                                        <AddCircleIcon />
                                                    }
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
                            )}

                            {/* Step 4 */}
                            {/* Actors */}
                            {activeStep === 3 && (
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant='subtitle2'>
                                        Actors list:
                                    </Typography>
                                    <FieldArray name='actors'>
                                        {({ push, remove }) => (
                                            <Stack spacing={1} mt={1}>
                                                {values.actors.map(
                                                    (_, index) => (
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
                                                                    remove(
                                                                        index,
                                                                    )
                                                                }
                                                                disabled={
                                                                    values
                                                                        .actors
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
                                                    startIcon={
                                                        <AddCircleIcon />
                                                    }
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
                            )}

                            {/* Step 5 */}
                            {/* Studios */}
                            {activeStep === 4 && (
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant='subtitle2'>
                                        Studios list:
                                    </Typography>
                                    <FieldArray name='studios'>
                                        {({ push, remove }) => (
                                            <Stack spacing={1} mt={1}>
                                                {values.studios.map(
                                                    (_, index) => (
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
                                                                    remove(
                                                                        index,
                                                                    )
                                                                }
                                                                disabled={
                                                                    values
                                                                        .studios
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
                                                    startIcon={
                                                        <AddCircleIcon />
                                                    }
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
                            )}

                            {/* NAVIGATION Buttons */}
                            <Grid
                                size={{ xs: 12 }}
                                sx={{ mt: 2 }} /* item xs={12} sx={{ mt: 2 }} */
                            >
                                <Stack
                                    direction='row'
                                    justifyContent='space-between'
                                >
                                    <Button
                                        type='button'
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        startIcon={<NavigateBeforeIcon />}
                                    >
                                        Back
                                    </Button>

                                    <Stack direction='row' spacing={2}>
                                        <Button
                                            type='button'
                                            variant='outlined'
                                            onClick={() => navigate('/movies')}
                                            startIcon={<UndoIcon />}
                                        >
                                            Exit
                                        </Button>

                                        <Button
                                            type='button'
                                            disabled={location.pathname.includes(
                                                'edit',
                                            )}
                                            onClick={() => {
                                                resetForm();
                                            }}
                                            variant='contained'
                                            color='error'
                                            startIcon={<RestartAltIcon />}
                                        >
                                            Reset
                                        </Button>

                                        {!isLastStep ? (
                                            <Button
                                                type='button'
                                                variant='contained'
                                                disabled={!isValid}
                                                // onClick={() =>
                                                //     handleNext(validateForm)
                                                // }
                                                onClick={(e) =>
                                                    handleNext(e, validateForm)
                                                }
                                                endIcon={<NavigateNextIcon />}
                                            >
                                                Next
                                            </Button>
                                        ) : (
                                            <Button
                                                variant='contained'
                                                color='success'
                                                type='submit'
                                                disabled={!isValid}
                                                startIcon={<SaveIcon />}
                                            >
                                                {values.id ? 'Update' : 'Save'}
                                            </Button>
                                        )}
                                    </Stack>
                                </Stack>
                            </Grid>

                            {/* Buttons */}
                            {/* <Grid size={{ xs: 4 }}>
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
                            </Grid> */}
                        </Grid>
                    </Form>
                )}
            </Formik>
        </LocalizationProvider>
    );
}

export default MoviesForm;
