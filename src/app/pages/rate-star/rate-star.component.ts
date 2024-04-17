import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rate-star',
  templateUrl: './rate-star.component.html',
  styleUrls: ['./rate-star.component.scss']
})
export class RateStarComponent {
  @Input() maxStars: number = 5;
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();
  stars: number[]; 

  constructor() {
    this.stars = Array(this.maxStars).fill(0).map((x, i) => i); // Start from 0
  }

  rateStar(index: number) {
    this.value = index;
    this.valueChange.emit(this.value);
  }
}
