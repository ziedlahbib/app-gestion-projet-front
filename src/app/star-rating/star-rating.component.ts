import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() rating: number = 0;

  constructor() { }

  ngOnInit(): void {
  
  }
  getStars(): number[] {
    return Array(Math.ceil(this.rating)).fill(0).map((x, i) => i + 1);
  }
  
  getStarClass(star: number): string[] {
    if (this.rating >= star) {
      return ['full'];
    } else if (this.rating + 0.5 >= star) {
      return ['half'];
    } else {
      return ['empty'];
    }
  }
  

}
