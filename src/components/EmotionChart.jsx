import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

export default ({dataChart}) => {
  const options = {
    chart: {
      type: 'area'
    },
    title: {
      useHTML: true,
      text: 'Title of chart',
      align: 'left'
    },
    subtitle: {
      text: 'Source: ' +
        '<a href="https://energiogklima.no/klimavakten/land-med-hoyest-utslipp/"' +
        'target="_blank">description</a>',
      align: 'left'
    },
    accessibility: {
      point: {
        valueDescriptionFormat: '{index}. {point.category}, {point.y:,' +
          '.1f} billions, {point.percentage:.1f}%.'
      }
    },
    yAxis: {
      labels: {
        format: '{value}%'
      },
      title: {
        enabled: false
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>' +
        ': <b>{point.percentage:.1f}%</b> ({point.y:,.1f} billion Gt)<br/>',
      split: true
    },
    plotOptions: {
      series: {
        pointStart: 1990
      },
      area: {
        stacking: 'percent',
        marker: {
          enabled: false
        }
      }
    },
    series: dataChart
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}