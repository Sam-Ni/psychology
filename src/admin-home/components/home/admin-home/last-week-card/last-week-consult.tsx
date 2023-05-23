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
import {faker, tr} from "@faker-js/faker";
import {getDateOfLastSevenDays} from "../../../../utils/utils";

import './last-week-consult.css'

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

const labels = getDateOfLastSevenDays();

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

export function LastWeekConsult() {
  return (
    <Card >
      <div className='last-table'>
        <Line options={options} data={data} />
      </div>
    </Card>
  );
}
