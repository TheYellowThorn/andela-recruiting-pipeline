import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartData, BarElement, Chart} from 'chart.js';
import { AnyObject } from 'chart.js/dist/types/basic';

const FulfillmentMetricsChart = (props: { data: any }) => {

  Chart.register(BarElement);

  const fulfillmentChartData: ChartData = {
    labels: ['Hired', 'Rejected', 'In Play'],
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

  const fulfillmentChartOptions: AnyObject = {
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
      <Bar data={fulfillmentChartData as any} options={fulfillmentChartOptions as any} plugins={[ChartDataLabels]}></Bar>
      <div className="chart-title">Fulfillment Metrics</div>
    </>
  );
}

export default FulfillmentMetricsChart;
