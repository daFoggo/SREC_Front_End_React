import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import routes from './routeConfig';

import Login from '../components/Login';
import SignUp from '../components/SignUp';
import CVMatching from '../components/CVMatching.jsx';
import CodeProblem from '../components/CodeProblem';
import PrivateRoute from './PrivateRoute';
import Forbidden from '../components/Forbidden';
import Layout from '../components/Layout.jsx';

const AppRoutes = () => {
    const location = useLocation();

    const getTitleFromPath = (pathname) => {
        switch (pathname) {
            case routes.login:
                return 'Login';
            case routes.register:
                return 'Registry';
            case routes.code_problem:
                return 'Code Problem';
            case routes.cv_matching:
                return 'CV Matching';
            case routes.forbidden:
                return 'Access Denied';
            default:
                return 'Page Not Found';
        }
    };

    const currentTitle = getTitleFromPath(location.pathname);

    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>{currentTitle}</title>
                </Helmet>
            </HelmetProvider>

            <Routes>
                <Route path={routes.login} element={<Login />} />
                <Route path={routes.register} element={<SignUp />} />
                <Route path={routes.forbidden} element={<Forbidden />} />

                <Route element={<Layout />}>
                    <Route
                        path={routes.code_problem}
                        element={
                            <PrivateRoute requiredRole="candidate">
                                <CodeProblem />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path={routes.cv_matching}
                        element={
                            <PrivateRoute requiredRole="recruiter">
                                <CVMatching />
                            </PrivateRoute>
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
};

export default AppRoutes;
