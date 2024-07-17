
import { useState, useEffect } from 'react';
import axios from 'axios';
import { rootAPI } from '../utils/ip';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import loginTheme from '../themes/loginTheme';
import { useAlert } from '../context/AlertContext';
import routes from '../routes/routeConfig';

import {
    TextField,
    Button,
    ThemeProvider,
    Typography,
    Link,
    CircularProgress,
} from '@mui/material';

import ImageCarousel from './ImageCarousel';

const LoginRecruiter = () => {
    const navigate = useNavigate();
    const { saveTokenAndUserData, role } = useAuth();
    const { showAlert } = useAlert();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!userName || !password) {
            setMsg('Please fill in all fields');
            return;
        } else {
            setLoading(true);

            try {
                const response = await axios.post(`${rootAPI}/login/recruiter`, {
                    userName,
                    password,
                });

                const token = response.data.access_token;
                saveTokenAndUserData(token);
                setMsg('');
            } catch (error) {
                setMsg(error.response.data.msg);
                showAlert({
                    message: error.response.data.msg,
                    type: 'error',
                });
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (role === 'recruiter') {
            navigate(routes.job_description);
        }
    }, [role]);

    return (
        <ThemeProvider theme={loginTheme}>
            <div className="flex flex-col sm:flex-row w-full h-[100vh] rounded-xl bg-white p-3">
                <div className="flex flex-col sm:w-1/2 h-full text-left p-5 sm:p-20">
                    <div className="flex flex-col items-center"> 
                        <h1 className='font-bold text-6xl font-spaceGrotesk text-primary950 text-center'>Login</h1> 
                        <p className='font-medium text-lg font-spaceGrotesk text-slate-500 mt-2 text-center max-w-md'> 
                            Unlock your hiring potential. Start finding your next star employees
                        </p>
                    </div>

                    <div className="mt-24 flex flex-col items-center gap-5 w-full max-w-md mx-auto"> 
                        <TextField
                            label="User name"
                            variant="outlined"
                            type="text"
                            placeholder="User name"
                            onChange={(e) => setUserName(e.target.value)}
                            fullWidth 
                        />

                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth 
                        />

                        {msg && <Typography variant="body2" className="text-red-500 w-full text-center">{msg}</Typography>} 
                        <Button
                            variant="contained"
                            onClick={handleLogin}
                            className="w-full sm:w-1/2 text-white py-2 sm:py-3 rounded-md" 
                            sx={{
                                backgroundColor: '#10a1fc',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                '&:hover': {
                                    backgroundColor: '#0077d1',
                                    textTransform: 'none',
                                },
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                        </Button>
                    </div>
                </div>

                <div className="hidden sm:flex flex-col w-1/2 bg-primary500 rounded-xl text-white py-20 px-14">
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                        SREC
                    </Typography>

                    <div className='flex flex-col justify-center h-full'>
                        <h1 className='text-3xl font-bold font-spaceGrotesk text-justify'>
                            Revolutionize your recruitment process with SREC,<br />
                            our advanced AI-powered platform.
                        </h1>
                        <p className="text-sm font-spaceGrotesk opacity-80 mt-5 text-justify max-w-3xl">
                            Experience seamless evaluation of both hard and soft skills through automated resume screening, tailored coding assessments,
                            personality tests, and virtual interviews. Save time, improve accuracy, and ensure inclusivity with
                            our comprehensive solution designed for IT recruitment and beyond.
                        </p>
                    </div>

                    {/* <ImageCarousel /> */}
                </div>
            </div>
        </ThemeProvider>
    );
};

export default LoginRecruiter;
