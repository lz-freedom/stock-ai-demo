import React from 'react';
import ReactECharts from 'echarts-for-react';

const BullishChart: React.FC = () => {
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
                data: [120, 200, 150, 80, 70, 110, 130].map((val, idx) => val + idx * 50), // Upward trend
                type: 'line',
                smooth: true,
                lineStyle: { color: '#ef4444' }, // Red usually indicates up in China, but green in US. Let's use Red for Bullish in this demo as per China stock market usually, or Green. Let's stick to standard Red = Rise for China user context? User is "Chinese Native Developer".
                // Actually user context says "Chinese Native Developer". In China, Red is Up, Green is Down.
                itemStyle: { color: '#ef4444' }
            },
        ],
        tooltip: {
            trigger: 'axis',
        },
    };

    return <ReactECharts option={options} style={{ height: '300px', width: '100%' }} />;
};

export default BullishChart;
