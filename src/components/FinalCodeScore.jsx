import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PageLoadingOverlay from './PageLoadingOverlay';
import axios from 'axios';
import { rootAPI } from '../utils/ip';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/routeConfig';

const FinalCodeScore = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [finalScore, setFinalScore] = useState(null);
    const [assessmentData, setAssessmentData] = useState(null);
    const { user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                handleGetFinalCodeScore();
            }, 1000);
        }
    }, [user]);


    const handleGetFinalCodeScore = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${rootAPI}/get-final-code-score`, {
                candidate_id: user.sub.id,
            });

            handleSetFinalScore(response.data.final_score);
            handleSetAssessmentData(response.data.assessment_data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSetFinalScore = (score) => {
        setFinalScore(score);
    }

    const handleSetAssessmentData = (data) => {
        setAssessmentData(data);
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    if (isLoading) {
        return <PageLoadingOverlay />;
    }

    return (
        <div className='p-2 sm:py-12 sm:px-36 h-full flex flex-col gap-5'>
            <div className='flex flex-col'>
                <p className="font-bold text-sm text-slate-500">Code assessment</p>
                <h1 className='font-bold text-2xl sm:text-4xl text-primary950 text-left'>Code Assessment Score</h1>
            </div>
            <div className='flex flex-col-reverse sm:flex-row gap-5 w-full h-full justify-between'>
                <div className="bg-white p-5 flex-1 rounded-xl shadow-md w-full overflow-y-scroll">
                    <div className='flex flex-col gap-10'>
                        {
                            assessmentData && assessmentData.map((data, index) => {

                                return (
                                    <div key={index} className='flex flex-col' >
                                        <p className='font-bold text-primary950 text-2xl'>Problem {index + 1}</p>
                                        <p className='font-bold  text-slate-500'>Score: {data.assessment_score} / 1</p>
                                        <div className='flex flex-col gap-3 mt-5'>
                                            <TextField multiline label={"Code convention score"} value={data.code_convention_score}></TextField>
                                            <TextField multiline label={"Code convention comment"} value={data.code_convention_comment}></TextField>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='bg-white p-5 flex flex-col rounded-xl shadow-md items-center gap-2'>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                        <Gauge width={300} height={230} value={finalScore} valueMin={0} valueMax={3} style={{
                            color: '#10a1fc',
                            fontSize: 48,
                            fontWeight: 'bold',
                        }} />
                    </Stack>
                    <p className='font-bold text-primary950'>Score: {finalScore} / 3</p>
                    <div className='flex flex-col text-left bg-primary50 w-full p-3 rounded-md mt-5 gap-5'>
                        <p className='text-primary950 text-lg'>Candidate Name: {user.sub.full_name} </p>
                        <p className='text-primary950 text-lg'> Candidate Level: {capitalizeFirstLetter(user.sub.job_level)} </p>
                    </div>
                    
                    <button className='bg-primary500 hover:bg-primary600 py-3 px-5 text-white font-bold rounded-md mt-5' onClick={
                        () => {
                            navigate(routes.virtual_interview);
                        }
                    }>Navigate to next challenge</button>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default FinalCodeScore;
