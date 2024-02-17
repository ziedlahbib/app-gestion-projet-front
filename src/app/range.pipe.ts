// range.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {
  transform(value: number): number[] {
    const result = [];
    for (let i = 0; i < value; i++) {
      result.push(i);
    }
    return result;
  }
}
