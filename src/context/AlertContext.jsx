import { createContext, useContext, useState} from "react";
import propTypes from "prop-types";

export const AlertContext = createContext();

export const useAlert = () => {
    return useContext(AlertContext);
}

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const showAlert = (alert) => {
        setAlerts([...alerts, { ...alert, id: new Date().getTime() }])
    }

    const hideAlert = (id) => {
        setAlerts(alerts.filter((alert) => alert.id !== id));
    }

    return (
        <AlertContext.Provider value={{ alerts, showAlert, hideAlert}}>
            {children}
        </AlertContext.Provider>
    )
}

AlertProvider.propTypes = {
    children: propTypes.node.isRequired,
}