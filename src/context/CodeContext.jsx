import { createContext, useState, useContext, useEffect } from "react";
import propTypes from "prop-types";

export const CodeContext = createContext();

export const useCode = () => {
    return useContext(CodeContext);
}

export const CodeProvider = ({ children }) => {
    const [codeData, setCodeData] = useState();
    const [totalPoint, setTotalPoint] = useState(0);
    const [currentProblem, setCurrentProblem] = useState(() => {
        return localStorage.getItem("currentProblem") || "1";
    });

    useEffect(() => {
        localStorage.setItem("currentProblem", currentProblem);
    }, [currentProblem]);

    const updatePoint = (result) => {
        setTotalPoint((prevTotalPoint) => result === "correct" ? prevTotalPoint + 1 : prevTotalPoint);
    }

    const updateCodeData = (data) => {
        setCodeData(data);
    }

    const updateCurrentProblem = () => {
        setCurrentProblem((c) => {
            const newProblem = (parseInt(c) + 1).toString();
            localStorage.setItem("currentProblem", newProblem);
            return newProblem;
        });
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
