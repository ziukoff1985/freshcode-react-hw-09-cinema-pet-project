import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

// import { clearActorForEdit } from '../../store/slices/actorsSlice';
import { createActor, updateActor } from '../../store/thunks/actorsThunks';
import { useState } from 'react';

const steps = ['Name', 'Details', 'Photo', 'Movies'];

function ActorsForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0); // For Stepper

    const actorForEdit = useSelector((state) => state.actorsList.actorForEdit);

    const actorValidationSchema = [
        Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
        }),
        Yup.object({
            birthDate: Yup.string().required('Birth date is required'),
            nationality: Yup.string().required('Nationality is required'),
        }),
        Yup.object({
            image: Yup.string()
                .url('Invalid URL')
                .required('Image URL is required'),
        }),
        Yup.object({
            movies: Yup.array()
                .of(Yup.string().required('At least one movie is required'))
                .min(1),
        }),
    ];

    const currentValidationSchema = actorValidationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    const handleNext = (validateForm) => {
        validateForm().then((errors) => {
            if (Object.keys(errors).length === 0) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        });
    };

    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleSubmitForm = (values, action) => {
        const formattedValues = {
            ...values,
            birthDate: values.birthDate
                ? dayjs(values.birthDate).format('YYYY-MM-DD')
                : '',
        };

        if (!values.id) {
            dispatch(createActor(formattedValues));
            action.resetForm();
            setActiveStep(0);
        } else {
            dispatch(updateActor(formattedValues));
        }
    };

    // const handleGoBack = () => {
    //     if (location.pathname.includes('edit')) {
    //         navigate(`/actors/${actorForEdit.id}`);
    //         clearActorForEdit();
    //     } else {
    //         navigate(-1);
    //         clearActorForEdit();
    //     }
    // };

    // * Old validation without Stepper
    // const actorValidationSchema = Yup.object().shape({
    //     firstName: Yup.string().required('First name is required'),
    //     lastName: Yup.string().required('Last name is required'),
    //     birthDate: Yup.string().required('Birth date is required'),
    //     nationality: Yup.string().required('Nationality is required'),
    //     image: Yup.string()
    //         .url('Invalid URL')
    //         .required('Image URL is required'),
    //     movies: Yup.array()
    //         .of(Yup.string().required('At least one movie is required'))
    //         .min(1),
    // });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Formik
                initialValues={actorForEdit}
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
                            {values.id ? 'Edit actor' : 'Add actor'}
                        </Typography>
                        <Grid container spacing={2} sx={{ minHeight: '200px' }}>
                            {/* Step 1 */}
                            {activeStep === 0 && (
                                <>
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
                                </>
                            )}
                            {/* <Grid size={{ xs: 6 }}>
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
                            </Grid> */}

                            {/* Step 2 */}
                            {/* DatePicker */}
                            {activeStep === 1 && (
                                <>
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
                                                setFieldValue(
                                                    'birthDate',
                                                    newValue,
                                                )
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
                                </>
                            )}
                            {/* DatePicker */}
                            {/* <Grid size={{ xs: 6 }}>
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
                            </Grid> */}

                            {/* Step 3 */}
                            {activeStep === 2 && (
                                <Grid size={{ xs: 12 }}>
                                    <CustomTextField
                                        name='image'
                                        label='Image URL'
                                    />
                                </Grid>
                            )}
                            {/* <Grid size={{ xs: 12 }}>
                                <CustomTextField
                                    name='image'
                                    label='Image URL'
                                />
                            </Grid> */}

                            {/* Step 4 */}
                            {activeStep === 3 && (
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant='subtitle2'>
                                        Movies List - min 1 movie:
                                    </Typography>
                                    <FieldArray name='movies'>
                                        {({ push, remove }) => (
                                            <Stack spacing={1} mt={1}>
                                                {values.movies.map(
                                                    (_, index) => (
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
                                                                    remove(
                                                                        index,
                                                                    )
                                                                }
                                                                disabled={
                                                                    values
                                                                        .movies
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
                                                    Add Movie
                                                </Button>
                                            </Stack>
                                        )}
                                    </FieldArray>
                                </Grid>
                            )}
                            {/* <Grid size={{ xs: 12 }}>
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
                            </Grid> */}

                            {/* Кнопки навігації */}
                            <Grid
                                size={{ xs: 12 }}
                                sx={{ mt: 2 }} /* item xs={12} sx={{ mt: 2 }} */
                            >
                                <Stack
                                    direction='row'
                                    justifyContent='space-between'
                                >
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        startIcon={<NavigateBeforeIcon />}
                                    >
                                        Back
                                    </Button>

                                    <Stack direction='row' spacing={2}>
                                        <Button
                                            variant='outlined'
                                            onClick={() => navigate('/actors')}
                                            startIcon={<UndoIcon />}
                                        >
                                            Exit
                                        </Button>

                                        <Button
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
                                                variant='contained'
                                                onClick={() =>
                                                    handleNext(validateForm)
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

export default ActorsForm;
