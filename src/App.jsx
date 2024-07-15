import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import { CodeProvider } from './context/CodeContext';
import { CVMatchingProvider } from './context/CVMatchingContext';
import { VirtualInterviewProvider } from './context/VirtualInterviewContext';
import AppRoutes from './routes/index';
import AlertList from './components/AlertList';

const App = () => {
  return (
    <Router>
      <VirtualInterviewProvider>
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
      </VirtualInterviewProvider>
    </Router>
  );
}

export default App;
