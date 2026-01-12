import React from 'react';
import ReactECharts from 'echarts-for-react';

const BearishChart: React.FC = () => {
    const options = {
        grid: { top: 20, right: 20, bottom: 20, left: 40, containLabel: true },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320].reverse(), // Downward trend
                type: 'line',
                smooth: true,
                lineStyle: { color: '#22c55e' }, // Green for down in China
                itemStyle: { color: '#22c55e' }
            },
        ],
        tooltip: {
            trigger: 'axis',
        },
    };

    return <ReactECharts option={options} style={{ height: '300px', width: '100%' }} />;
};

export default BearishChart;
