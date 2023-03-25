import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter-card',
  templateUrl: './counter-card.component.html',
  styleUrls: ['./counter-card.component.css']
})
export class CounterCardComponent {
  @Input() count: number = 0;
  @Input() description: string = '';
}
