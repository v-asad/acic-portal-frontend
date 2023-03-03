import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid, Box, Typography, Stack } from '@mui/material';

export default function ResponsesModal({ isOpen, handleClose }) {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogContent sx={{ minWidth: '800px', width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ py: 2 }}>
                        <Typography variant="h4">Responses</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack>
                            <Typography variant="p">Response 1</Typography>
                            <Typography variant="p">Response 2</Typography>
                            <Typography variant="p">Response 3</Typography>
                            <Typography variant="p">Response 4</Typography>
                            <Typography variant="p">Response 5</Typography>
                            <Typography variant="p">Response 6</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
