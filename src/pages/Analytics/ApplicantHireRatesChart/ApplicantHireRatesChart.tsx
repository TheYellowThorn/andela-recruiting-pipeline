import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartData, BarElement, Chart} from 'chart.js';
import { AnyObject } from 'chart.js/dist/types/basic';

const ApplicantHireRatesChart = (props: { data: any }) => {

  Chart.register(BarElement);

  const hireRateChartData: ChartData = {
    labels: ['1 Week', '2 Weeks', '30 Days', '60 Days'],
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

  const hireRateChartOptions: AnyObject = {
    plugins: {
      datalabels: {
        formatter: (value: any, context: any) => {
          return `${value}`;
        },
        color: 'white',
      },
    }
  };
  
  return (
    <>
      <Bar data={hireRateChartData as any} options={hireRateChartOptions as any} plugins={[ChartDataLabels]}></Bar>
      <div className="chart-title">Hire Rates</div>
    </>
  );
}

export default ApplicantHireRatesChart;
