import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PersonalityChart = ({ personalityData }) => {

  const chartOptions = {
    chart: {
      type: 'pie'
    },
    title: {
      text: ''
    },
    colors: ['#b7e2ff', '#77cbff', '#2eb1ff', '#10a1fc', '#0077d1'],
    series: [{
      name: 'Percentage',
      data: [
        { name: 'Dependable', y: personalityData.dependable * 100 },
        { name: 'Extraverted', y: personalityData.extraverted * 100 },
        { name: 'Lively', y: personalityData.lively * 100 },
        { name: 'Responsible', y: personalityData.responsible * 100 },
        { name: 'Serious', y: personalityData.serious * 100 }
      ]
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
    <div className="w-full h-full bg-transparent">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
      />
    </div>
  );
};

export default PersonalityChart;
