import { AfterViewInit, Component, Input, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import * as ApexCharts from 'apexcharts';

@Component({
    selector: "app-abstract-chart",
    template: ''
})
export abstract class AbstractChart implements AfterViewInit, OnDestroy {
    apexChart: any;

    @Input() id = '';
    @Input() valuesObservable$ = new Observable<any[]>();
    @Input() valuesSubscription$: Subscription = new Subscription();
    @Input() title: string = '';
  
    ngOnDestroy(): void {
      this.valuesSubscription$.unsubscribe();
    }
  
    ngAfterViewInit(): void {
      this.valuesSubscription$ = this.valuesObservable$.subscribe(values => {
        let options = this.createOptions(values);
        if (this.apexChart) {
          this.apexChart.updateOptions(options);
          return;
        }
        this.apexChart = new ApexCharts(document.querySelector('#' + this.id + ' .apexchart'), options);  
        this.apexChart.render();
      });
    }
  
    abstract createOptions(values: any): {};
}