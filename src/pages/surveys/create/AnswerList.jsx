// material-ui
import { Box, Grid, InputLabel, OutlinedInput, Stack, IconButton, Typography } from '@mui/material';

import { PlusOutlined, DragOutlined, DeleteOutlined } from '@ant-design/icons';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ANSWER_SCHEMA = { id: new Date().getTime(), title: '' };

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const AnswerList = ({ answers = [], setAnswers = () => {}, questionId = '' }) => {
    const addAnswer = () => {
        const newAnswer = { ...ANSWER_SCHEMA, id: new Date().getTime() };
        setAnswers([...answers, newAnswer]);
    };

    const updateAnswer = (updatedAnswer) => {
        setAnswers(
            answers.map((answer) => {
                if (answer.id === updatedAnswer.id) return updatedAnswer;
                else return answer;
            })
        );
    };

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reOrderedAnswers = reorder(answers, result.source.index, result.destination.index);
        setAnswers(reOrderedAnswers);
    };

    const deleteAnswer = (answerId) => {
        setAnswers(
            answers.filter((answer) => {
                if (answer.id === answerId) return false;
                else return true;
            })
        );
    };

    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <InputLabel>Answers</InputLabel>
                <IconButton
                    sx={{ cursor: 'pointer', border: (theme) => '1px solid ' + theme.palette.primary.main }}
                    color="primary"
                    size="small"
                    onClick={addAnswer}
                >
                    <PlusOutlined />
                </IconButton>
            </Box>
            {answers.length !== 0 ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={'A_DROPPABLE_' + questionId}>
                        {(provided, { isDraggingOver }) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <Box
                                    sx={
                                        isDraggingOver && {
                                            transition: '0.25s all ease-in-out',
                                            border: (theme) => '1px dashed ' + theme.palette.primary.main,
                                            p: 1,
                                            background: '#fafafa',
                                            borderRadius: 2,
                                            pb: 15
                                        }
                                    }
                                >
                                    <div hidden>{provided.placeholder}</div>
                                    <Stack spacing={1}>
                                        {answers.map((answer, index) => (
                                            <Draggable key={'a' + answer.id} draggableId={'a' + answer.id} index={index}>
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps}>
                                                        <Grid container>
                                                            <Grid item xs={1}>
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        height: '100%',
                                                                        flexDirection: 'column',
                                                                        justifyContent: 'flex-start',
                                                                        alignItems: 'center'
                                                                    }}
                                                                >
                                                                    <IconButton sx={{ cursor: 'grab' }} {...provided.dragHandleProps}>
                                                                        <DragOutlined />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        sx={{ cursor: 'pointer' }}
                                                                        onClick={() => deleteAnswer(answer.id)}
                                                                    >
                                                                        <DeleteOutlined />
                                                                    </IconButton>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={11}>
                                                                <Answer answer={answer} setAnswer={updateAnswer} />
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </Stack>
                                </Box>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : (
                <Typography variant="h5" sx={{ textAlign: 'center', my: 2, fontWeight: 'normal' }}>
                    No answers added yet...
                </Typography>
            )}
        </>
    );
};

const Answer = ({ answer, setAnswer }) => {
    const handleTitleChange = (e) => {
        const title = e.target.value;
        setAnswer({ ...answer, title });
    };

    return (
        <>
            <OutlinedInput
                fullWidth
                type="text"
                value={answer.title}
                onChange={handleTitleChange}
                placeholder="Answer"
                multiline
                rows={3}
            />
        </>
    );
};

export default AnswerList;
