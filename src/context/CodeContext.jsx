import { createContext, useState, useContext, useEffect } from "react";
import propTypes from "prop-types";

export const CodeContext = createContext();

export const useCode = () => {
    return useContext(CodeContext);
}

export const CodeProvider = ({ children }) => {
    const [assessmentData, setAssessmentData] = useState({});
    const [currentProblem, setCurrentProblem] = useState(1);
    const [problemData, setProblemData] = useState({});

    const handleUpdateAssessmentData = (newAssessmentData) => {
        setAssessmentData(newAssessmentData);
    }

    const handleUpdateCurrentProblem = (newCurrentProblem) => {
        setCurrentProblem(newCurrentProblem);
    }

    const handleUpdateProblemData = (newProblemData) => {
        setProblemData(newProblemData);
    }   

    return (
        <CodeContext.Provider value={{ assessmentData, currentProblem, problemData, handleUpdateAssessmentData, handleUpdateCurrentProblem, handleUpdateProblemData }}>
            {children}
        </CodeContext.Provider>
    );
}

CodeProvider.propTypes = {
    children: propTypes.node,
};
