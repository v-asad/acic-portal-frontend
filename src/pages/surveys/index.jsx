import { useNavigate } from 'react-router-dom';

// material-ui
import { Box, Grid, List, ListItemButton, ListItemText, Typography, Button } from '@mui/material';

// project import
import OrdersTable from './OrdersTable';

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
                    <Button color="primary" variant="outlined" onClick={() => navigate('create')}>
                        <PlusOutlined />
                        &nbsp; Create Survey
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
                <MainCard content={false}>
                    <OrdersTable />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Analytics Report</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                        <ListItemButton divider>
                            <ListItemText primary="Company Finance Growth" />
                            <Typography variant="h5">+45.14%</Typography>
                        </ListItemButton>
                        <ListItemButton divider>
                            <ListItemText primary="Company Expenses Ratio" />
                            <Typography variant="h5">0.58%</Typography>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Business Risk Cases" />
                            <Typography variant="h5">Low</Typography>
                        </ListItemButton>
                    </List>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Surveys;
