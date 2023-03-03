import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// project import
import { MainLayout, AuthLayout } from 'hocs';
import { Loadable } from 'components';

const AuthLogin = Loadable(lazy(() => import('pages/login')));
const AuthRegister = Loadable(lazy(() => import('pages/register')));

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Profile = Loadable(lazy(() => import('pages/profile')));
const Surveys = Loadable(lazy(() => import('pages/surveys')));
const SurveyDetails = Loadable(lazy(() => import('pages/surveys/details')));
const CreateSurvey = Loadable(lazy(() => import('pages/surveys/create')));

// ==============================|| ROUTING RENDER ||============================== //

const AppRoutes = ({ isLoggedIn }) => {
    if (isLoggedIn)
        return (
            <MainLayout>
                <Routes>
                    <Route index element={<DashboardDefault />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/surveys" element={<Surveys />} />
                    <Route path="/surveys/create" element={<CreateSurvey />} />
                    <Route path="/surveys/:id" element={<SurveyDetails />} />
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
            </MainLayout>
        );
    else
        return (
            <AuthLayout>
                <Routes>
                    <Route path="/register" element={<AuthRegister />} />
                    <Route path="*" element={<AuthLogin />} />
                </Routes>
            </AuthLayout>
        );
};

export default AppRoutes;

