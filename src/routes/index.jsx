import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import routes from "./routeConfig";

import LoginCandidate from "../components/LoginCandidate.jsx";
import LoginRecruiter from "../components/LoginRecruiter.jsx";
import SignUp from "../components/SignUp";
import CVMatching from "../components/CVMatching.jsx";
import CodeProblem from "../components/CodeProblem";
import FinalCodeScore from "../components/FinalCodeScore.jsx";
import VirtualInterview from "../components/VirtualInterview.jsx";
import PrivateRoute from "./PrivateRoute";
import Forbidden from "../components/Forbidden";
import Layout from "../components/Layout.jsx";
import Home from "../components/Home";
import PageNotFound from "../components/PageNotFound";
import ThankYou from "../components/ThankYou.jsx";
import SummaryTable from "../components/SummaryTable.jsx";
import SummaryDashboard from "../components/SummaryDashboard.jsx";
import Survey from "../components/Survey.jsx";
import JobDescription from "../components/JobDescription.jsx";

const AppRoutes = () => {
    const location = useLocation();

    const getTitleFromPath = (pathname) => {
        switch (pathname) {
            case routes.home:
                return "Home";
            case routes.login_candidate:
                return "Login For Candidate";
            case routes.login_recruiter:
                return "Login For Recruiter";
            case routes.register:
                return "Registry";
            case routes.job_description: 
                return "Job Description";
            case routes.cv_matching:
                return "CV Matching";
            case routes.code_problem:
                return "Code Problem";
            case routes.code_problem_result:
                return "Code Problem Result";
            case routes.virtual_interview:
                return "Virtual Interview";
            case routes.summary:
                return "Summary";
            case routes.summary_dashboard:
                return "Summary Dashboard";
            case routes.thank_you:
                return "Thank You";
            case routes.forbidden:
                return "Access Denied";
            default:
                return "Page Not Found";
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
                <Route path={routes.login_recruiter} element={<LoginRecruiter />} />
                <Route path={routes.login_candidate} element={<LoginCandidate />} />
                {/* <Route path={routes.register} element={<SignUp />} /> */}
                <Route path={routes.forbidden} element={<Forbidden />} />
                <Route path={routes.pageNotFound} element={<PageNotFound />}></Route>

                <Route path={routes.home} element={<Home />} />

                <Route element={<Layout />}>
                    <Route
                        path={routes.job_description}
                        element={
                            <PrivateRoute requiredRole="recruiter">
                                <JobDescription />
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
                        path={routes.code_problem}
                        element={
                            <PrivateRoute requiredRole="candidate">
                                <CodeProblem />
                            </PrivateRoute>
                        }
                    ></Route>


                    <Route
                        path={routes.final_code_assessment_score}
                        element={
                            <PrivateRoute requiredRole="candidate">
                                <FinalCodeScore />
                            </PrivateRoute>
                        }
                    ></Route>


                    <Route
                        path={routes.personality_test}
                        element={
                            <PrivateRoute requiredRole="candidate">
                                <Survey />
                            </PrivateRoute>
                        }
                    ></Route>

                    <Route
                        path={routes.virtual_interview}
                        element={
                            <PrivateRoute requiredRole="candidate">
                                <VirtualInterview />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path={routes.summary_table}
                        element={
                            <PrivateRoute requiredRole="recruiter">
                                <SummaryTable />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path={routes.summary_dashboard}
                        element={
                            <PrivateRoute requiredRole="recruiter">
                                <SummaryDashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path={routes.thank_you}
                        element={
                            <PrivateRoute requiredRole="candidate">
                                <ThankYou />
                            </PrivateRoute>
                        }
                    />
                </Route>

                <Route
                    path="*"
                    element={<Navigate to={routes.pageNotFound} replace />}
                />
            </Routes>
        </div>
    );
};

export default AppRoutes;
