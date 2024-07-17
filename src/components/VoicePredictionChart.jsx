import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';


ChartJS.register(ArcElement, Tooltip, Legend);

const VoicePredictionChart = ({ voicePrediction }) => {
    const mainColor = '#10a1fc';
    const blueShades = [
        mainColor,
        '#3db4fd',
        '#6ac7fe',
        '#97d9ff',
        '#c4ecff',
        '#0081d9',
        '#0062b6',
        '#004393',
        '#002470',
        '#00114d'
    ];

    const emotionData = {
        labels: Object.keys(voicePrediction.emotion_prediction),
        datasets: [{
            data: Object.values(voicePrediction.emotion_prediction),
            backgroundColor: blueShades.slice(0, Object.keys(voicePrediction.emotion_prediction).length),
        }],
    };

    const fluencyData = {
        labels: Object.keys(voicePrediction.fluency_prediction),
        datasets: [{
            data: Object.values(voicePrediction.fluency_prediction),
            backgroundColor: blueShades.slice(0, Object.keys(voicePrediction.fluency_prediction).length),
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
        },
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', color: "#052b4c", fontWeight: "bold" }}>
            <Box sx={{ width: '20%', minWidth: 100 }}>
                <Typography variant="h6" align="center">Emotion Prediction</Typography>
                <Pie data={emotionData} options={options} />
            </Box>
            <Box sx={{ width: '20%', minWidth: 100 }}>
                <Typography variant="h6" align="center">Fluency Prediction</Typography>
                <Pie data={fluencyData} options={options} />
            </Box>
        </Box>
    );
};

export default VoicePredictionChart;