import { createContext, useState, useContext, useEffect } from "react";
import propTypes from "prop-types";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    const clearUserData = () => {
        setToken(null);
        setUser(null);
        setRole(null);
        localStorage.removeItem("token");
    }

    const saveTokenAndUserData = (userToken) => {
        setToken(userToken);
        localStorage.setItem("token", userToken);

        try {
            const decodedUser = jwtDecode(userToken);
            setUser(decodedUser);
            setRole(decodedUser.sub.role);
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
        try {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
            setRole(decodedUser.sub.role); 
        } catch (error) {
            handleTokenError(error);
        }

        console.log(role)
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, user, role, saveTokenAndUserData: saveTokenAndUserData, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: propTypes.node.isRequired,
}
