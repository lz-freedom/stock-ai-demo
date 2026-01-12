import React from 'react';
import ReactECharts from 'echarts-for-react';

const VolumeChart: React.FC = () => {
    const options = {
        grid: { top: 20, right: 20, bottom: 20, left: 40, containLabel: true },
        xAxis: {
            data: ['A', 'B', 'C', 'D', 'E'],
        },
        yAxis: {},
        series: [
            {
                type: 'bar',
                data: [5, 20, 36, 10, 10],
                itemStyle: {
                    color: '#6366f1' // Indigo
                }
            },
        ],
        tooltip: {
            trigger: 'axis',
        },
    };

    return <ReactECharts option={options} style={{ height: '300px', width: '100%' }} />;
};

export default VolumeChart;
