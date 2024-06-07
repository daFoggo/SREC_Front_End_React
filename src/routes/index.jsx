import { Routes, Route } from "react-router-dom";
import routes from "./routeConfig";

import Login from "../components/Login";
import SignUp from "../components/SignUp";
import CVMatching from "../components/CVMatching.jsx";
import CodeProblem from "../components/CodeProblem";
import PrivateRoute from "./PrivateRoute";
import Forbidden from "../components/Forbidden";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={routes.login} element={<Login />} />

            <Route path={routes.register} element={<SignUp />} />

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

            <Route
                path={routes.forbidden}
                element={
                    <Forbidden />
                }
            />

        </Routes>
    );
};

export default AppRoutes;
