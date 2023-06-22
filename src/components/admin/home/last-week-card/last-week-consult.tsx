import {Card} from "antd";

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
import {faker, } from "@faker-js/faker";

import './last-week-consult.css'
import {getDateOfLastSevenDays} from "../../../../util/fake";
import {CSSProperties} from "react";
// import {getDateOfLastSevenDays} from "../../../../admin-home/utils/utils";

interface LastWeekChartProps{
  style?: CSSProperties;
  labels: string[];
  dataList: number[];
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
      text: '7日咨询数量统计',
    },
  },
  aspectRatio: 5,
};

export function LastWeekConsult({style={},labels,dataList}:LastWeekChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: '访问人数',
        data: dataList,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Card style={style}>
        <Line options={options} data={data} />
    </Card>
  );
}
