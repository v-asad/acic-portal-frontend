import { useState } from 'react';
import { AppRoutes } from 'routes';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const Authenticator = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const [cookies] = useCookies(['user']);

    const userCookie = cookies.user;

    useEffect(() => {
        if (userCookie) {
            console.log('User found: ', userCookie);
            setLoggedIn(true);
        } else {
            console.log('User not found');
            setLoggedIn(false);
        }
    }, [userCookie]);

    return <AppRoutes isLoggedIn={isLoggedIn} />;
};

export default Authenticator;
