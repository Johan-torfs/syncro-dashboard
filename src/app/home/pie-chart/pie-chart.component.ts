import { Component } from '@angular/core';
import { AbstractChart } from '../abstract-chart.component';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent extends AbstractChart {
  override createOptions(values: {key: string, value: number}[]) {
    let options = {
      series: values.map(obj => obj.value),
      chart: {
        type: 'donut',
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        position: 'bottom'
      },
      labels: values.map(obj => obj.key)
    };

    return options;
  }
}
