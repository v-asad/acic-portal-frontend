import React, { useState } from 'react';

import { Grid, Typography, Card, TextField, FormControlLabel, RadioGroup, Radio, Box, Button, Divider } from '@mui/material';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import ResponsesModal from './ResponsesModal';

const survey = {
    id: 'S1',
    name: 'Annual Dinner Venue',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit omnis adipisci eveniet eum a! Eveniet dolorem molestias amet deleniti nostrum quibusdam nesciunt laudantium ea magnam suscipit! A quia consequuntur odit!',
    questions: [
        {
            id: 'Q1',
            title: 'What was the Venue for the previous Annual Dinner (for the year 2020)',
            type: 'MCQ',
            answers: [
                {
                    id: 'A1',
                    title: 'Modal'
                },
                {
                    id: 'A2',
                    title: 'La Montanna'
                },
                {
                    id: 'A3',
                    title: 'Tuscany Courtyard'
                },
                {
                    id: 'A4',
                    title: "I don't remember"
                }
            ]
        },
        {
            id: 'Q2',
            title: 'Explain your experience of the previous Annual Dinner in your own words.',
            type: 'TEXT'
        },
        {
            id: 'Q3',
            title: 'What shoud be the venue of the Annual Dinner of this year (2021)',
            type: 'MCQ',
            answers: [
                {
                    id: 'A1',
                    title: 'Venue 1'
                },
                {
                    id: 'A2',
                    title: 'Venue 2'
                },
                {
                    id: 'A3',
                    title: 'Venue 3'
                },
                {
                    id: 'A4',
                    title: 'Venue 4'
                }
            ]
        }
    ]
};

const SurveyDetails = () => {
    const [areResponsesVisible, setResponsesVisible] = useState(false);

    const showResponses = () => {
        setResponsesVisible(true);
    };

    const hideResposes = () => {
        setResponsesVisible(false);
    };

    return (
        <>
            {/* Responses Modal */}
            <ResponsesModal isOpen={areResponsesVisible} handleClose={hideResposes} handleOpen={showResponses} />
            <Grid container>
                <Grid item xs={12}>
                    <Grid container sx={{ maxWidth: 1000 }}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Survey Details</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ textAlign: 'right' }}>
                                <Button variant="outlined" color="error" sx={{ mx: 0.5 }}>
                                    <DeleteOutlined />
                                    &nbsp;&nbsp;Delete
                                </Button>
                                <Button variant="outlined" color="info" sx={{ mx: 0.5 }}>
                                    <EditOutlined />
                                    &nbsp;&nbsp;Edit
                                </Button>

                                <Button variant="contained" color="primary" sx={{ ml: 5 }} onClick={showResponses}>
                                    View Responses
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10} sx={{ py: 2 }}>
                    <Card sx={{ p: 2, maxWidth: 1000 }}>
                        <Typography variant="h4" sx={{ py: 2 }}>
                            {survey.name}
                        </Typography>
                        <Typography variant="p" sx={{ py: 2 }}>
                            {survey.description}
                        </Typography>
                    </Card>
                </Grid>
                <Divider sx={{ my: 2, maxWidth: 1000 }} />
                <Grid item xs={10} sx={{ py: 2 }}>
                    <Typography variant="h6">Questions</Typography>
                    {survey.questions.map((question) => {
                        return (
                            <Card sx={{ p: 2, my: 2, maxWidth: 1000 }}>
                                <Typography variant="h5" sx={{ py: 1 }}>
                                    {question.title}
                                </Typography>
                                {question.type === 'MCQ' ? (
                                    <RadioGroup>
                                        <Grid container>
                                            {question.answers.map((answer) => {
                                                return (
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControlLabel value={answer.id} control={<Radio />} label={answer.title} />
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    </RadioGroup>
                                ) : (
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant="caption">Answer</Typography>
                                            <TextField fullWidth multiline rows={6} />
                                        </Grid>
                                    </Grid>
                                )}
                            </Card>
                        );
                    })}
                </Grid>
            </Grid>
        </>
    );
};

export default SurveyDetails;
