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
            try {
                const decodedUser = JSON.parse(atob(token.split(".")[1]));
                setUser(decodedUser);
            } catch (error) {
                console.error("Failed to decode token:", error);
                setToken(null);
                setUser(null);
                localStorage.removeItem("token");
            }
        }
    }, [token]);

    const saveToken = (userToken) => {
        setToken(userToken);
        localStorage.setItem("token", userToken);
        try {
            const decodedUser = JSON.parse(atob(userToken.split(".")[1]));
            setUser(decodedUser);
        } catch (error) {
            console.error("Failed to decode token:", error);
            setToken(null);
            setUser(null);
            localStorage.removeItem("token");
        }
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
