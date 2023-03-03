import React, { useRef } from 'react';

import { Avatar, Grid, Card, Typography, Box, IconButton, Button, TextField, Select, MenuItem } from '@mui/material';
import { EditOutlined } from '@ant-design/icons';

const Profile = () => {
    const fileInputRef = useRef(null);
    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '150px',
                            height: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Box sx={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <input type="file" accept="image/*" ref={fileInputRef} hidden />
                            <IconButton
                                sx={{
                                    background: (theme) => theme.palette.primary.main,
                                    zIndex: 99,
                                    color: 'white',
                                    borderRadius: 10,
                                    '&:hover': { background: (theme) => theme.palette.primary.main }
                                }}
                                onClick={() => fileInputRef.current.click()}
                            >
                                <EditOutlined />
                            </IconButton>
                        </Box>
                        <Avatar sx={{ height: '100%', width: '100%' }}>
                            <img
                                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                alt="User Profile"
                            />
                        </Avatar>
                    </Box>
                    <Grid container spacing={1} sx={{ my: 3 }}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Profile Details</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption">First Name</Typography>
                            <TextField fullWidth placeholder="First Name" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption">Last Name</Typography>
                            <TextField fullWidth placeholder="Last Name" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption">Email</Typography>
                            <TextField fullWidth placeholder="user@example.com" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption">Gender</Typography>
                            <Select value="Female" fullWidth>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
                            <Button variant="contained" sx={{ px: 5 }}>Save</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Profile;
