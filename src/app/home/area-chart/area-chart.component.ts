import { Component } from '@angular/core';
import { AbstractChart } from '../abstract-chart.component';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent extends AbstractChart {
  override createOptions(values: {key: string, open: number, resolved: number}[]) {
    let options = {
      series: [
        {
          name: 'Open',
          data: values.map(obj => obj.open)
        },
        {
          name: 'Resolved',
          data: values.map(obj => obj.resolved)
        },
      ],
      chart: {
        type: 'area',
        stacked: true,
        width: 700,
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        }
      },
      legend: {
        position: 'bottom'
      },
      xaxis: {
        categories: values.map(obj => obj.key)
      },
      toolbar: {
        show: false
      },
      responsive: [
        {
          breakpoint: 1300,
          options: {
            chart: {
              width: '100%'
            }
          }
        }
      ]
    };

    return options;
  }
}
