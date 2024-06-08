import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const PrivateRoute = ({ children, requiredRole }) => {
    const { user, role, loading } = useAuth();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user || (requiredRole && role !== requiredRole)) {
        return <Navigate to="/forbidden" />;
    }

    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    requiredRole: PropTypes.string
};

export default PrivateRoute;
