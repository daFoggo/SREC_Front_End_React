import { createContext, useContext, useState } from "react";
import propTypes from "prop-types";

export const VirutalInterviewContext = createContext();

export const useVirtualInterview = () => {
    return useContext(VirutalInterviewContext);
}

export const VirtualInterviewProvider = ({ children }) => {
    const [interviewData, setInterviewData] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [questionData, setQuestionData] = useState({});

    const handleUpdateInterviewData = (data) => {
        setInterviewData(data);
    };

    const handleUpdateCurrentQuestion = (index) => {
        setCurrentQuestion(index);
    };

    const handleUpdateQuestionData = (data) => {
        setQuestionData(data);
    };

    return (
        <VirutalInterviewContext.Provider value={{ interviewData, currentQuestion, questionData, handleUpdateInterviewData, handleUpdateCurrentQuestion, handleUpdateQuestionData, }}>
            {children}
        </VirutalInterviewContext.Provider>
    );

}

VirtualInterviewProvider.propTypes = {
    children: propTypes.node,
};