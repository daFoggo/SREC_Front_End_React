import { createContext, useState, useContext, useEffect } from "react";
import propTypes from "prop-types";

export const CVMatchingContext = createContext();

export const useCVMatching = () => {
    return useContext(CVMatchingContext);
}

export const CVMatchingProvider = ({ children }) => {
    const [CVMatchingData, setCVMatchingData] = useState();
    const [jobDescriptionData, setJobDescriptionData] = useState();

    const updateCVMatchingData = (data) => {
        setCVMatchingData(data);
    }

    const updateJobDescriptionData = (data) => {
        setJobDescriptionData(data);
    }

    return (
        <CVMatchingContext.Provider value={{CVMatchingData, jobDescriptionData, updateCVMatchingData, updateJobDescriptionData}}>
            {children}
        </CVMatchingContext.Provider>
    );
}

CVMatchingProvider.propTypes = {
    children: propTypes.node,
};