import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartData, BarElement, Chart} from 'chart.js';

const ApplicationsBySourceChart = (props: { data: { labels: string[], counts: number[]} }) => {

  Chart.register(BarElement);

  const applicationsBySourceChartData: ChartData = {
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

  const applicationsBySourceChartOptions = {
    plugins: {
      datalabels: {
        formatter: (value: any, context: any) => {
          return `${Math.round(100 * value)}%`;
        },
        color: 'white',
      },
    },
    scales: {
      y: {
        ticks: {
          format: {
            style: 'percent'
          }
        }
      }
    }
  }; 

  return (
    <>
      <Bar data={applicationsBySourceChartData as any} options={applicationsBySourceChartOptions as any} plugins={[ChartDataLabels]}></Bar>
      <div className="chart-title">Applications By Source</div>
    </>
  );
}

export default ApplicationsBySourceChart;
