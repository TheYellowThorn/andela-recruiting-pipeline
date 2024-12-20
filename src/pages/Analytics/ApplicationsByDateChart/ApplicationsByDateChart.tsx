import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, CategoryScale, Chart, LinearScale, PointElement, LineElement} from 'chart.js';

const ApplicationsByDateChart = (props: { data: { labels: string[], counts: number[]} }) => {

  Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

  const applicationSubmissionChartData: ChartData = {
    labels: props.data.labels,
    datasets: [
        {
          label: 'My First Dataset',
          data: props.data.counts,
          borderWidth: 1,
          fill: false,
          backgroundColor: [
            'rgb(54, 162, 235)'
          ],
        }
    ]
  }

  return (
    <>
      <Line data={applicationSubmissionChartData as any}></Line>
      <div className="chart-title">Applications By Date</div>
    </>
  );
}

export default ApplicationsByDateChart;
