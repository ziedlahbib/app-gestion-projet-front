import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() maxStars: number = 5;
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();

  stars: number[];

  constructor() {
    this.stars = Array(this.maxStars).fill(0).map((x, i) => i);
  }

  rateStar(index: number) {
    this.value = index + 1;
    this.valueChange.emit(this.value);
  }
}
