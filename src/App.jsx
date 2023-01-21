import { CookiesProvider } from 'react-cookie';

// project import
import { Authenticator } from 'hocs';
import { ThemeCustomization } from 'themes';
import { ScrollTop } from 'components';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
    return (
        <CookiesProvider>
            <ThemeCustomization>
                <ScrollTop>
                    <Authenticator />
                </ScrollTop>
            </ThemeCustomization>
        </CookiesProvider>
    );
};

export default App;
