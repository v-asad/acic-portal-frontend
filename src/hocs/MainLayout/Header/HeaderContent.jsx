import { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';

// material-ui
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    CardContent,
    ClickAwayListener,
    Grid,
    IconButton,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';

// material-ui
import { useTheme } from '@mui/material/styles';

// project import
import { MainCard } from 'components';
import Transitions from 'components/@extended/Transitions';

// assets
import { LogoutOutlined } from '@ant-design/icons';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    return (
        <>
            <Box sx={{ width: '100%', ml: 1 }} />
            <Profile />
        </>
    );
};

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
    const theme = useTheme();

    const [, , removeCookie] = useCookies(['user']);

    const handleLogout = async () => {
        removeCookie('user');
    };

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <ButtonBase
                sx={{
                    borderRadius: 10
                }}
                aria-label="open profile"
                ref={anchorRef}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Avatar sx={{ width: 32, height: 32, fontSize: 14, background: (theme) => theme.palette.primary.main }}>A</Avatar>
            </ButtonBase>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        {open && (
                            <Paper
                                sx={{
                                    boxShadow: theme.customShadows.z1,
                                    width: 290,
                                    minWidth: 240,
                                    maxWidth: 290,
                                    [theme.breakpoints.down('md')]: {
                                        maxWidth: 250
                                    }
                                }}
                            >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MainCard elevation={0} border={false} content={false}>
                                        <CardContent sx={{ p: 2.5 }}>
                                            <Grid container justifyContent="space-between" alignItems="center">
                                                <Grid item>
                                                    <Button sx={{ py: 0.5, px: 1.5, borderRadius: 1 }}>
                                                        <Stack direction="row" spacing={1.25} alignItems="center">
                                                            <Avatar
                                                                sx={{
                                                                    width: 32,
                                                                    height: 32,
                                                                    fontSize: 14,
                                                                    background: (theme) => theme.palette.primary.main
                                                                }}
                                                            >
                                                                A
                                                            </Avatar>
                                                            <Stack>
                                                                <Typography variant="h6">John Doe</Typography>
                                                                <Typography variant="body2" color="textSecondary">
                                                                    Convener
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton size="large" color="secondary" onClick={handleLogout}>
                                                        <LogoutOutlined />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        )}
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default HeaderContent;
