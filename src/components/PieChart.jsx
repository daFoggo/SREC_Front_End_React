import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

export default ({ dataChart }) => {
    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Title chart'
        },
        tooltip: {
            valueSuffix: '%'
        },
        subtitle: {
            text:
                'Content chart'
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
