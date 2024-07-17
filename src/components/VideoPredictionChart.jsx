import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Box, Typography } from '@mui/material';

ChartJS.register(LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement);

const VideoPredictionChart = ({ videoPrediction }) => {
    const mainColor = '#10a1fc';
    const emotionColors = {
        angry: '#158ee5',
        disgust: '#2098ee',
        fear: '#2aa1f6',
        happy: '#34aafa',
        sad: '#4abcfb',
        surprise: '#5dcbfd',
        neutral: '#6ed8fe'
    };

    const labels = videoPrediction.map(dataPoint => dataPoint.s);

    const datasets = Object.keys(emotionColors).map(emotion => ({
        label: emotion.charAt(0).toUpperCase() + emotion.slice(1),
        data: videoPrediction.map(dataPoint => dataPoint.emotion[emotion]),
        borderColor: emotionColors[emotion],
        fill: false
    }));

    const data = {
        labels,
        datasets
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Time (s)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Emotion Intensity (%)'
                }
            }
        }
    };

    return (
        <Box sx={{ width: '100%', color: "#052b4c" }}>
            <Typography variant="h6" align="center">Video Prediction Chart</Typography>
            <Line data={data} options={options} />
        </Box>
    );
};

export default VideoPredictionChart;
