import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// project import
import { MainLayout, AuthLayout } from 'hocs';
import { Loadable } from 'components';

const AuthLogin = Loadable(lazy(() => import('pages/login')));
const AuthRegister = Loadable(lazy(() => import('pages/register')));

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Surveys = Loadable(lazy(() => import('pages/surveys')));
const CreateSurvey = Loadable(lazy(() => import('pages/surveys/Create')));

// ==============================|| ROUTING RENDER ||============================== //

const AppRoutes = ({ isLoggedIn }) => {
    if (isLoggedIn)
        return (
            <MainLayout>
                <Routes>
                    <Route index element={<DashboardDefault />} />
                    <Route path="/surveys" element={<Surveys />} />
                    <Route path="/surveys/create" element={<CreateSurvey />} />
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
            </MainLayout>
        );
    else
        return (
            <AuthLayout>
                <Routes>
                    <Route index element={<AuthLogin />} />
                    <Route path="/register" element={<AuthRegister />} />
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
            </AuthLayout>
        );
};

export default AppRoutes;
