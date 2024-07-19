import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const EmotionChart = ({ dataChart }) => {
  if (!Array.isArray(dataChart) || dataChart.length === 0) {
    console.log("dataChart is not a valid array or is empty");
    return <div>No data available for emotion chart</div>;
  }

  const series = dataChart.map(item => ({
    ...item,
    data: item.data.map(value => parseFloat(value) || 0)  
  }));

  const colors = ['#10a1fc', '#00C4FF', '#FFE7A0', '#F4D160', '#FFE7A0', '#FEB941'];

  const options = {
    chart: {
      type: 'area'
    },
    title: {
      text: 'Emotion Analysis Over Time',
      align: 'left'
    },
    subtitle: {
      text: 'Source: Video Prediction Data',
      align: 'left'
    },
    xAxis: {
      title: {
        text: 'Time (seconds)'
      },
      categories: series[0]?.data.map((_, index) => index.toString()) || [],
      labels: {
        formatter: function () {
          const labelIndex = Math.round(this.value);
          return labelIndex % 2 === 0 ? this.value : ''; 
        }
      }
    },
    yAxis: {
      labels: {
        format: '{value}%'
      },
      title: {
        text: 'Emotion Intensity'
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.2f}%</b><br/>',
      shared: true
    },
    plotOptions: {
      area: {
        stacking: 'percent',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#ffffff'
        }
      }
    },
    colors: colors, 
    series: series
  };

  return (
    <div style={{width: '100%'}}>
      <HighchartsReact
        containerProps={{ style: { height: "550px" } }}
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default EmotionChart;