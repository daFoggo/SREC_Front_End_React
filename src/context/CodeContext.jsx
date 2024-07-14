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
    const [indexInData, setIndexInData] = useState(0);

    const handleUpdateAssessmentData = (data) => {
        setAssessmentData(data);
    };

    const handleUpdateCurrentProblem = (index) => {
        setCurrentProblem(index);
    };

    const handleUpdateProblemData = (data) => {
        setProblemData(data);
    };
    

    return (
        <CodeContext.Provider value={{ assessmentData, currentProblem, problemData, indexInData, handleUpdateAssessmentData, handleUpdateCurrentProblem, handleUpdateProblemData, }}>
            {children}
        </CodeContext.Provider>
    );
}

CodeProvider.propTypes = {
    children: propTypes.node,
};
