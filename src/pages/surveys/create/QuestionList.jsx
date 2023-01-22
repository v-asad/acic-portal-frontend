// material-ui
import { Box, Grid, InputLabel, OutlinedInput, Stack, Select, MenuItem, Button, IconButton } from '@mui/material';

import { PlusOutlined, DragOutlined, DeleteOutlined } from '@ant-design/icons';
import { MainCard } from 'components';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import AnswerList from './AnswerList';

const QUESTION_TYPES = ['TEXT', 'MCQ'];

const ANSWER_SCHEMA = { id: new Date().getTime(), title: '' };
const QUESTION_SCHEMA = { id: new Date().getTime(), title: '', type: 'TEXT', answers: [] };

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

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reOrderedQuestions = reorder(questions, result.source.index, result.destination.index);
        setQuestions(reOrderedQuestions);
    };

    const deleteQuestion = (questionId) => {
        setQuestions(
            questions.filter((question) => {
                if (question.id === questionId) return false;
                else return true;
            })
        );
    };

    return (
        questions.length !== 0 && (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="Q_DROPPABLE">
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
                                                <div ref={provided.innerRef} {...provided.draggableProps}>
                                                    <Grid item xs={12}>
                                                        <IconButton sx={{ cursor: 'grab' }} {...provided.dragHandleProps}>
                                                            <DragOutlined />
                                                        </IconButton>
                                                        <IconButton sx={{ cursor: 'pointer' }} onClick={() => deleteQuestion(question.id)}>
                                                            <DeleteOutlined />
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
        )
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

    const shouldShowAnswers = question.type === 'MCQ';

    return (
        <MainCard sx={{ cursor: 'default' }} boxShadow={true} border={false} shadow={'0 0 10px -7px black'}>
            <Grid container spacing={1}>
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
                {shouldShowAnswers && (
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <AnswerList
                                questionId={question.id}
                                answers={question.answers}
                                setAnswers={(answers) => setQuestion({ ...question, answers })}
                            />
                        </Stack>
                    </Grid>
                )}
            </Grid>
        </MainCard>
    );
};

export default QuestionList;
