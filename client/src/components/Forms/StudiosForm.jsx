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

import { createStudio, updateStudio } from '../../store/thunks/studiosThunks';
import { useState } from 'react';
// import { clearStudioForEdit } from '../../store/slices/studiosSlice';

const steps = ['Title', 'Details', 'Logo', 'Movies'];

function StudiosForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [activeStep, setActiveStep] = useState(0); // For Stepper

    const studioForEdit = useSelector(
        (state) => state.studiosList.studioForEdit,
    );

    const studioValidationSchema = [
        Yup.object({
            title: Yup.string().required('Title is required'),
        }),
        Yup.object({
            location: Yup.string().required('Location is required'),
            foundationDate: Yup.string().required(
                'Foundation date is required',
            ),
        }),
        Yup.object({
            logo: Yup.string()
                .url('Invalid logo URL')
                .required('logo URL is required'),
        }),
        Yup.object({
            movies: Yup.array()
                .of(Yup.string().required('At least one movie is required'))
                .min(1),
        }),
    ];

    const currentValidationSchema = studioValidationSchema[activeStep];
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
            studioValidationSchema[activeStep].fields,
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
        console.log('SUBMIT TRIGGERED AT STEP:', activeStep);
        if (!isLastStep) return;

        const formattedValues = {
            ...values,
            foundationDate: values.foundationDate
                ? dayjs(values.foundationDate).format('YYYY-MM-DD')
                : '',
        };

        if (!values.id) {
            dispatch(createStudio(formattedValues));
            // action.resetForm();
            setActiveStep(0);
            navigate('/studios');
        } else {
            dispatch(updateStudio(formattedValues));
            navigate(`/studios/${studioForEdit.id}`);
            setActiveStep(0);
        }
    };

    // const handleGoBack = () => {
    //     if (location.pathname.includes('edit')) {
    //         navigate(`/studios/${studioForEdit.id}`);
    //         clearStudioForEdit();
    //     } else {
    //         navigate(-1);
    //         clearStudioForEdit();
    //     }
    // };

    // * Old validation without Stepper

    // const studioValidationSchema = Yup.object().shape({
    //     title: Yup.string().required('Title is required'),
    //     location: Yup.string().required('Location is required'),
    //     foundationDate: Yup.string().required('Foundation date is required'),
    //     movies: Yup.array()
    //         .of(Yup.string().required('At least one movie is required'))
    //         .min(1),
    //     logo: Yup.string().url('Invalid URL').required('Logo URL is required'),
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
                initialValues={structuredClone(studioForEdit)}
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
                            {values.id ? 'Edit studio' : 'Add studio'}
                        </Typography>
                        <Grid container spacing={2} sx={{ minHeight: '200px' }}>
                            {/* Step 1 */}
                            {activeStep === 0 && (
                                <Grid size={{ xs: 12 }}>
                                    <CustomTextField
                                        name='title'
                                        label='Title'
                                    />
                                </Grid>
                            )}

                            {/* Step 2 */}
                            {activeStep === 1 && (
                                <>
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
                                                    ? dayjs(
                                                          values.foundationDate,
                                                      )
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
                                </>
                            )}

                            {/* Step 3 */}
                            {activeStep === 2 && (
                                <Grid size={{ xs: 12 }}>
                                    <CustomTextField
                                        name='logo'
                                        label='Logo URL'
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
                                            onClick={() => navigate('/studios')}
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

export default StudiosForm;
