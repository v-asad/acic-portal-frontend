// material-ui
import { Box, Grid, List, ListItemButton, ListItemText, Typography, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import { SaveOutlined } from '@ant-design/icons';

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
            <Grid item xs={12} md={7} lg={8}>
                <MainCard content={false}></MainCard>
            </Grid>
        </Grid>
    );
};

export default Surveys;
