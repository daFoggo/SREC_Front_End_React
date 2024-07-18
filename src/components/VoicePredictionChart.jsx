import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography } from '@mui/material';

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
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Emotion Prediction'
    },
    colors: blueShades.slice(0, Object.keys(voicePrediction.emotion_prediction).length),
    series: [{
      name: 'Emotion',
      data: Object.entries(voicePrediction.emotion_prediction).map(([key, value]) => ({
        name: key,
        y: value
      }))
    }],
    plotOptions: {
      pie: {
        dataLabels: {
          format: '{point.name}: {point.y:.1f}%'
        }
      }
    }
  };

  const fluencyData = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Fluency Prediction'
    },
    colors: blueShades.slice(0, Object.keys(voicePrediction.fluency_prediction).length),
    series: [{
      name: 'Fluency',
      data: Object.entries(voicePrediction.fluency_prediction).map(([key, value]) => ({
        name: key,
        y: value
      }))
    }],
    plotOptions: {
      pie: {
        dataLabels: {
          format: '{point.name}: {point.y:.1f}%'
        }
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', color: "#052b4c", fontWeight: "bold" }}>
      <Box sx={{ width: '45%', minWidth: 200, mb: 2 }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={emotionData}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
      <Box sx={{ width: '45%', minWidth: 200 }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={fluencyData}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
    </Box>
  );
};

export default VoicePredictionChart;
