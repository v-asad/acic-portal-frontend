// material-ui
import { FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import { MainCard } from 'components';

import QuestionList from './QuestionList';

const ANSWER_SCHEMA = { id: new Date().getTime(), title: '' };
const QUESTION_SCHEMA = { id: new Date().getTime(), title: '', type: 'TEXT', answers: [] };

const INITIAL_VALUES = {
    title: '',
    description: '',
    questions: [{ ...QUESTION_SCHEMA, answers: [{ ...ANSWER_SCHEMA }] }]
};

const VALIDATION_SCHEMA = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(255).required('Description is required')
});

const CreateSurvey = () => {
    const onSubmit = async (_, { setErrors, setStatus, setSubmitting }) => {
        try {
            setStatus({ success: false });
            setSubmitting(false);
        } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }
    };

    return (
        <>
            <Formik initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA} onSubmit={onSubmit}>
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <MainCard boxShadow={true} border={false} shadow={'0 0 10px -7px black'}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="survey-title">Title*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.title && errors.title)}
                                                id="survey-title"
                                                type="text"
                                                value={values.email}
                                                name="title"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{}}
                                                placeholder="Survey for..."
                                            />
                                            {touched.title && errors.title && <FormHelperText error>{errors.title}</FormHelperText>}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} py={1}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="survey-description">Description*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.description && errors.description)}
                                                id="survey-description"
                                                type="text"
                                                value={values.description}
                                                name="description"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{}}
                                                multiline
                                                rows={10}
                                                placeholder="Describe the purpose of this survey..."
                                            />
                                            {touched.description && errors.description && (
                                                <FormHelperText error>{errors.description}</FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                </MainCard>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Stack spacing={1} pb={50}>
                                    <InputLabel>Questions</InputLabel>
                                    <QuestionList questions={values.questions} setQuestions={(q) => setFieldValue('questions', q)} />
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default CreateSurvey;
