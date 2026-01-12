import React from 'react';
import ReactECharts from 'echarts-for-react';

const CandlestickChart: React.FC = () => {
    const options = {
        grid: { top: 20, right: 20, bottom: 20, left: 40, containLabel: true },
        xAxis: {
            data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27'],
        },
        yAxis: {},
        series: [
            {
                type: 'k',
                data: [
                    [20, 34, 10, 38],
                    [40, 35, 30, 50],
                    [31, 38, 33, 44],
                    [38, 15, 5, 42],
                ],
                itemStyle: {
                    color: '#ef4444',     // Bullish (Red)
                    color0: '#22c55e',    // Bearish (Green)
                    borderColor: '#ef4444',
                    borderColor0: '#22c55e'
                }
            },
        ],
        tooltip: {
            trigger: 'axis',
        },
    };

    return <ReactECharts option={options} style={{ height: '300px', width: '100%' }} />;
};

export default CandlestickChart;
