import React, {CSSProperties} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {faker, tr} from "@faker-js/faker";
import {Card} from "antd";

import './today-chart.css'

interface TodayChartProps{
  style?: CSSProperties;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      // position: 'top' as const,
      display: false,
    },
    title: {
      display: true,
      text: '今日咨询数量变化',
    },
  },
  aspectRatio: 5,
};

const labels = ['00:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00',
                        '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'];

export const data = {
  labels,
  datasets: [
    {
      label: '访问人数',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function TodayChartCard({style={}}:TodayChartProps) {
  return (
    <Card style={style}>
      <div style={{height:'100%'}}>
        <Line options={options} data={data} />
      </div>
    </Card>
  );
}
