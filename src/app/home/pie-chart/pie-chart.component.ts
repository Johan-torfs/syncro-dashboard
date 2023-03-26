import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit, OnInit {
  @ViewChild('.apexchart') chart: any;
  apexChart: any;

  @Input() values: {key: string, value: number}[] = [{key: '', value: 0}];
  @Input() title: string = '';

  options = {};

  ngOnInit(): void {
    const self = this;

    this.options = {
      series: this.values.map(obj => obj.value),
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
        formatter: function(val: number, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
          return self.values[+opts.seriesIndex]["key"] + " - " + opts.w.globals.series[opts.seriesIndex]
        }
      },
      title: {
        text: this.title
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }

  ngAfterViewInit(): void {
    this.apexChart = new ApexCharts(document.querySelector('.apexchart'), this.options);  
    this.apexChart.render();
  }
}
