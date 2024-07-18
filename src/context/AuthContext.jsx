import { createContext, useState, useContext, useEffect } from "react";
import propTypes from "prop-types";
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [jobLevel, setJobLevel] = useState(null);
    const [loading, setLoading] = useState(true);

    const clearUserData = () => {
        setToken(null);
        setUser(null);
        setRole(null);
        localStorage.clear(token);
    }

    const saveTokenAndUserData = (userToken) => {
        setToken(userToken);
        localStorage.setItem("token", userToken);

        try {
            const decodedUser = jwtDecode(userToken);
            setUser(decodedUser);
            if (decodedUser.sub) {
                setRole(decodedUser.sub.role);
            } else {
                setRole(null);
            }
        } catch (error) {
            handleTokenError(error);
        }
    }

    const handleTokenError = (error) => {
        console.error("Failed to decode token:", error);
        clearUserData();
    }

    const logout = () => {
        clearUserData();
    }

    useEffect(() => {
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
                if (decodedUser.sub) {
                    setRole(decodedUser.sub.role);
                    setJobLevel(decodedUser.sub.job_level);
                } else {
                    setRole(null);
                }
            } catch (error) {
                handleTokenError(error);
            }
        } else {
            console.log("No token found");
        }
        setLoading(false);
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, user, role, jobLevel, loading, saveTokenAndUserData, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: propTypes.node.isRequired,
}
