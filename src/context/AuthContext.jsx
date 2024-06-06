import { createContext, useState, useContext, useEffect } from "react";
import propTypes from "prop-types";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            const decodedUser = JSON.parse(atob(token.split(".")[1]));
            setUser(decodedUser);
        }
    }, [token]);

    const saveToken = (userToken) => {
        setToken(userToken);
        localStorage.setItem("token", userToken);
        const decodedUser = JSON.parse(atob(userToken.split(".")[1]));
        setUser(decodedUser);
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ token, user, saveToken, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: propTypes.node.isRequired,
}
