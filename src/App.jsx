import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import { CodeProvider } from './context/CodeContext';
import AppRoutes from './routes/index';
import AlertList from './components/AlertList';

const App = () => {
  return (
    <Router>
      <CodeProvider>
        <AuthProvider>
          <AlertProvider>
            <AlertList />
            <AppRoutes />
          </AlertProvider>
        </AuthProvider>
      </CodeProvider>
    </Router>
  );
}

export default App;
