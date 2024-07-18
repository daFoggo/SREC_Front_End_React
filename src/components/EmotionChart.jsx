import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const EmotionChart = ({ dataChart }) => {
  useEffect(() => {
    console.log("EmotionChart rendered with dataChart:", dataChart);
  }, [dataChart]);

  if (!Array.isArray(dataChart) || dataChart.length === 0) {
    console.log("dataChart is not a valid array or is empty");
    return <div>No data available for emotion chart</div>;
  }

  const series = dataChart.map(item => ({
    ...item,
    data: item.data.map(value => parseFloat(value) || 0)  
  }));

  console.log("Processed series data:", series);

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
          // Hiển thị chỉ một điểm trên trục X
          const labelIndex = Math.round(this.value);
          return labelIndex % 2 === 0 ? this.value : ''; // Chỉ hiển thị một số điểm
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
        lineColor: '#ffffff',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#ffffff'
        }
      }
    },
    series: series
  };

  console.log("Highcharts options:", options);

  return (
    <div style={{width: '100%', height: '400px'}}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default EmotionChart;
