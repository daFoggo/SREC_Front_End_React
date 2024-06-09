import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import AppRoutes from './routes/index';
import AlertList from './components/AlertList'; 

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AlertProvider>
          <AlertList />
          <AppRoutes />
        </AlertProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
