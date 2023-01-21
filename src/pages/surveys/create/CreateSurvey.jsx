// material-ui
import { Box, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Select, MenuItem, Button, IconButton } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import { PlusOutlined, DragOutlined } from '@ant-design/icons';
import { MainCard } from 'components';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const QUESTION_TYPES = ['TEXT', 'MCQ'];

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
                                <MainCard>
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
                                <Stack spacing={1}>
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

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const QuestionList = ({ questions = [], setQuestions = () => {} }) => {
    const addQuestion = () => {
        const newQuestion = { ...QUESTION_SCHEMA, id: new Date().getTime(), answers: [{ ...ANSWER_SCHEMA, id: new Date().getTime() }] };
        setQuestions([...questions, newQuestion]);
    };

    const updateQuestion = (updatedQuestion) => {
        setQuestions(
            questions.map((question) => {
                if (question.id === updatedQuestion.id) return updatedQuestion;
                else return question;
            })
        );
    };

    const onQuestionDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reOrderedQuestions = reorder(questions, result.source.index, result.destination.index);
        setQuestions(reOrderedQuestions);
    };

    return (
        <>
            {questions.length !== 0 && (
                <DragDropContext onDragEnd={onQuestionDragEnd}>
                    <Droppable droppableId="questionDroppable">
                        {(provided, { isDraggingOver }) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <Box
                                    sx={
                                        isDraggingOver
                                            ? {
                                                  transition: '0.25s all ease-in-out',
                                                  border: (theme) => '1px dashed ' + theme.palette.primary.main,
                                                  p: 1,
                                                  background: '#fafafa',
                                                  borderRadius: 2,
                                                  pb: 30
                                              }
                                            : {}
                                    }
                                >
                                    <div hidden>{provided.placeholder}</div>
                                    <Stack spacing={1}>
                                        {questions.map((question, index) => (
                                            <Draggable key={'q' + question.id} draggableId={'q' + question.id} index={index}>
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <Grid item xs={12}>
                                                            <IconButton sx={{ cursor: 'grab' }}>
                                                                <DragOutlined />
                                                            </IconButton>
                                                        </Grid>
                                                        <Question question={question} setQuestion={updateQuestion} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </Stack>
                                    {isDraggingOver || (
                                        <Button
                                            sx={{ width: '100%', my: 1, border: (theme) => '1px dashed ' + theme.palette.primary.main }}
                                            onClick={addQuestion}
                                        >
                                            <PlusOutlined />
                                            &nbsp;Add
                                        </Button>
                                    )}
                                </Box>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </>
    );
};

const Question = ({ question, setQuestion }) => {
    const handleTypeChange = (e) => {
        const type = e.target.value;
        setQuestion({ ...question, type });
    };
    const handleTitleChange = (e) => {
        const title = e.target.value;
        setQuestion({ ...question, title });
    };
    return (
        <MainCard sx={{ cursor: 'default' }}>
            <Stack spacing={1}>
                <Grid container xs={12} spacing={1}>
                    <Grid item xs={12} md={6}>
                        <OutlinedInput
                            fullWidth
                            type="text"
                            value={question.title}
                            onChange={handleTitleChange}
                            placeholder="Question Title"
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel>Question Type*</InputLabel>
                            <Select fullWidth value={question.type} onChange={handleTypeChange}>
                                {QUESTION_TYPES.map((type, index) => (
                                    <MenuItem key={index} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </MainCard>
    );
};

export default CreateSurvey;
