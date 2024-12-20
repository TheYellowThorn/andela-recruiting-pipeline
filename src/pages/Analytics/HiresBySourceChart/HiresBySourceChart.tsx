import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartData, BarElement, Chart} from 'chart.js';
import { AnyObject } from 'chart.js/dist/types/basic';

const HiresBySourceChart = (props: { data: { labels: string[], counts: number[]} }) => {

  Chart.register(BarElement);

  const hiresBySourceChartChartData: ChartData = {
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

  const hiresBySourceChartChartOptions: AnyObject = {
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
      <Bar data={hiresBySourceChartChartData as any} options={hiresBySourceChartChartOptions as any} plugins={[ChartDataLabels]}></Bar>
      <div className="chart-title">Hires By Source</div>
    </>
  );
}

export default HiresBySourceChart;
