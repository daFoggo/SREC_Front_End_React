import { createContext, useState, useContext, useEffect } from "react";
import propTypes from "prop-types";

export const CodeContext = createContext();

export const useCode = () => {
    return useContext(CodeContext);
}

export const CodeProvider = ({ children }) => {
    
}

CodeProvider.propTypes = {
    children: propTypes.node,
};