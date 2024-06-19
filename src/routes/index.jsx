import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import routes from './routeConfig';

import Login from '../components/Login';
import SignUp from '../components/SignUp';
import CVMatching from '../components/CVMatching.jsx';
import CodeProblem from '../components/CodeProblem';
import CodeResult from '../components/CodeResult.jsx';
import PrivateRoute from './PrivateRoute';
import Forbidden from '../components/Forbidden';
import Layout from '../components/Layout.jsx';
import Home from '../components/Home';
import PageNotFound from '../components/PageNotFound';

const AppRoutes = () => {
    const location = useLocation();

    const getTitleFromPath = (pathname) => {
        switch (pathname) {
            case routes.home:
                return 'Home';
            case routes.login:
                return 'Login';
            case routes.register:
                return 'Registry';
            case routes.code_problem:
                return 'Code Problem';
            case routes.code_problem_result:
                return 'Code Problem Result';
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
                <Route path={routes.pageNotFound} element={<PageNotFound />}></Route>

                <Route path={routes.home} element={<Home />} />
                <Route element={<Layout />}>
                    <Route
                        path={routes.code_problem}
                        element={
                            <PrivateRoute requiredRole="candidate">
                                <CodeProblem />
                            </PrivateRoute>
                        }
                    >
                    </Route>

                    <Route
                        path={routes.code_problem_result}
                        element={
                            <PrivateRoute requiredRole="candidate">
                                <CodeResult />
                            </PrivateRoute>
                        }
                    >
                    </Route>


                    <Route
                        path={routes.cv_matching}
                        element={
                            <PrivateRoute requiredRole="recruiter">
                                <CVMatching />
                            </PrivateRoute>
                        }
                    />
                </Route>

                <Route path="*" element={<Navigate to={routes.pageNotFound} replace />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;
