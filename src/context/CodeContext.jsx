import { createContext, useState, useContext, useEffect } from "react";
import propTypes from "prop-types";

export const CodeContext = createContext();

export const useCode = () => {
    return useContext(CodeContext);
}

export const CodeProvider = ({ children }) => {
    const [codeData, setCodeData] = useState();
    const [totalPoint, setTotalPoint] = useState(0);
    const [currentProblem, setCurrentProblem] = useState("1");

    const updatePoint = (result) => {
        setTotalPoint((prevTotalPoint) => result === "correct" ? prevTotalPoint + 1 : Math.max(prevTotalPoint - 1, 0));
    }

    const updateCodeData = (data) => {
        setCodeData(data);
    }

    const updateCurrentProblem = (problem) => {
        setCurrentProblem(problem);
    }

    return (
        <CodeContext.Provider value={{ codeData, totalPoint, currentProblem, updatePoint, updateCodeData, updateCurrentProblem }}>
            {children}
        </CodeContext.Provider>
    );
}

CodeProvider.propTypes = {
    children: propTypes.node,
};