import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import { CodeProvider } from './context/CodeContext';
import { CVMatchingProvider } from './context/CVMatchingContext';
import AppRoutes from './routes/index';
import AlertList from './components/AlertList';

const App = () => {
  return (
    <Router>
      <CVMatchingProvider>
        <CodeProvider>
          <AuthProvider>
            <AlertProvider>
              <AlertList />
              <AppRoutes />
            </AlertProvider>
          </AuthProvider>
        </CodeProvider>
      </CVMatchingProvider>
    </Router>
  );
}

export default App;
