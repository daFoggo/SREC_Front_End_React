import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, requiredRole }) => {
    const { user, role } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    } 

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/forbidden" />;
    } else {
        return children;
    }
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    requiredRole: PropTypes.string
};

export default PrivateRoute;
