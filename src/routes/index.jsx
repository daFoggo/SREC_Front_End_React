import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import CodeProblem from '../components/CodeProblem';
import PrivateRoute from './PrivateRoute';
import routes from './routeConfig';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<SignUp />} />
            <Route path={routes.codeProblem} element={<PrivateRoute><CodeProblem /></PrivateRoute>} />
        </Routes>
    );
}

export default AppRoutes;
