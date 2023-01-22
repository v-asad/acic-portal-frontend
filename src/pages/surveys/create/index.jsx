// material-ui
import { Box, Button, Grid, Typography } from '@mui/material';

// project import
import { MainCard } from 'components';

import { SaveOutlined } from '@ant-design/icons';

import CreateSurvey from './CreateSurvey';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Surveys = () => {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={12} lg={12}>
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <Typography variant="h3" color="primary" sx={{ flexGrow: 1 }}>
                        Create Survey
                    </Typography>
                    <Button color="primary" variant="contained" onClick={() => console.log('Saving')}>
                        <SaveOutlined />
                        &nbsp; Save
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <CreateSurvey />
            </Grid>
        </Grid>
    );
};

export default Surveys;
