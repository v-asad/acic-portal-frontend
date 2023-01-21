import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// project import
import { Layout } from 'hocs';
import { Loadable } from 'components';

const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Surveys = Loadable(lazy(() => import('pages/surveys')));
const CreateSurvey = Loadable(lazy(() => import('pages/surveys/Create')));

// ==============================|| ROUTING RENDER ||============================== //

const AppRoutes = ({ isLoggedIn }) => {
    if (isLoggedIn)
        return (
            <Layout>
                <Routes>
                    <Route index element={<DashboardDefault />} />
                    <Route path="/surveys" element={<Surveys />} />
                    <Route path="/surveys/create" element={<CreateSurvey />} />
                </Routes>
            </Layout>
        );
    else
        return (
            <Routes>
                <Route index element={<AuthLogin />} />
                <Route path="/register" element={<AuthRegister />} />
            </Routes>
        );
};

export default AppRoutes;
