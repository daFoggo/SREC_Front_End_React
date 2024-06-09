import { useAlert } from '../context/AlertContext';
import { Snackbar, Alert } from '@mui/material';

const AlertList = () => {
    const { alerts, hideAlert } = useAlert();

    return (
        <div>
            {alerts.map((alert) => (
                <Snackbar
                    key={alert.id}
                    open={true}
                    autoHideDuration={5000}
                    onClose={() => hideAlert(alert.id)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    sx={{
                        borderRadius: '1rem',
                        boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
                    }}
                >
                    <Alert onClose={() => hideAlert(alert.id)} severity={alert.type}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            ))}
        </div>
    );
}

export default AlertList;
