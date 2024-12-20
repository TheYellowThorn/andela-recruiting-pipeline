import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartData, BarElement, Chart} from 'chart.js';
import { AnyObject } from 'chart.js/dist/types/basic';

const PassThroughRatesChart = (props: { data: any }) => {

  Chart.register(BarElement);

  const passThroughChartData: ChartData = {
    labels: ['Prescreen', 'Interview', 'Offered', 'Hired'],
    datasets: [
        {
          label: 'slices',
          data: props.data,
          borderWidth: 1,
          fill: false,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ]
        }
    ]
  }

  const passThroughChartOptions: AnyObject = {
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
      <Bar data={passThroughChartData as any} options={passThroughChartOptions as any} plugins={[ChartDataLabels]}></Bar>
      <div className="chart-title">Pass Through Rates</div>
    </>
  );
}

export default PassThroughRatesChart;
