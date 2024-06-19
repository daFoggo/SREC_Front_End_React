
import { useState, useEffect } from 'react';
import axios from 'axios';
import { rootAPI } from '../utils/ip';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import loginTheme from '../themes/loginTheme';
import { useAlert } from '../context/AlertContext';

import {
    TextField,
    Button,
    ThemeProvider,
    Typography,
    Link,
    CircularProgress,
} from '@mui/material';

import ImageCarousel from './ImageCarousel';

const Login = () => {
    const navigate = useNavigate();
    const { saveTokenAndUserData, role } = useAuth();
    const { showAlert } = useAlert();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMsg('Please fill in all fields');
            return;
        } else {
            setLoading(true);

            try {
                const response = await axios.post(`${rootAPI}/login`, {
                    email,
                    password,
                });

                const token = response.data.access_token;
                saveTokenAndUserData(token);
                setMsg('');
                showAlert({
                    message: 'Login successful',
                    type: 'success',
                });
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
        if (role === 'candidate') {
            navigate('/code-assessment');
        } else if (role === 'recruiter') {
            navigate('/cv-matching');
        }
    }, [role]);

    return (
        <ThemeProvider theme={loginTheme}>
            <div className="flex flex-col sm:flex-row w-full h-[100vh] rounded-xl bg-white p-3">
                <div className="flex flex-col sm:w-full h-full text-left p-5 sm:p-20">
                    <div className="flex flex-col">
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                            Login
                        </Typography>
                        <Typography variant="body2">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/register"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#10a1fc',
                                    '&:hover': {
                                        color: '#0077d1',
                                    },
                                }}
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </div>

                    <div className="mt-24 flex flex-col gap-5">
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="text"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {msg && <Typography variant="body2" className="text-red-500">{msg}</Typography>}
                        <Button
                            variant="contained"
                            onClick={handleLogin}
                            className="self-end w-1/5 text-white py-2 sm:py-3 rounded-md"
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

                <div className="hidden sm:flex flex-col justify-between w-3/5 bg-primary500 rounded-xl text-white py-20 px-14">
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                        SREC
                    </Typography>

                    <div>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            Welcome back! <br />
                            Let&apos;s make a new recruitment
                        </Typography>
                        <Typography variant="body1" className="opacity-80">
                            Discover our advanced recruitment platform, <br />
                            offering a seamless evaluation process for both <br />
                            hard and soft skills.
                        </Typography>
                    </div>

                    <ImageCarousel />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Login;
