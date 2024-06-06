import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    return currentUser ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
};