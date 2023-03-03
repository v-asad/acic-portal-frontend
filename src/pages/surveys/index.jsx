import { useNavigate } from 'react-router-dom';

// material-ui
import { Box, Grid, Typography, Button } from '@mui/material';

// project import
import SurveysTable from './SurveysTable';

import MainCard from 'components/MainCard';

import { PlusOutlined } from '@ant-design/icons';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Surveys = () => {
    const navigate = useNavigate();

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={12} lg={12}>
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <Typography variant="h3" color="primary" sx={{ flexGrow: 1 }}>
                        Surveys
                    </Typography>
                    <Button color="primary" variant="contained" onClick={() => navigate('create')}>
                        <PlusOutlined />
                        &nbsp; Create Survey
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <MainCard content={false}>
                    <SurveysTable />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Surveys;
