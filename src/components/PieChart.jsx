import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

export default ({ dataChart }) => {
    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Emotion Overview'
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                colors: [  
                    '#10a1fc', '#00C4FF', '#FFE7A0', '#F4D160', '#FFE7A0', '#FEB941'
                ],
                dataLabels: [{
                    enabled: true,
                    distance: 20,
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '1.2em',
                        textOutline: 'none',
                        color: 'white'
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        series: [
            {
                name: 'Percentage',
                data: dataChart
            }
        ]
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}