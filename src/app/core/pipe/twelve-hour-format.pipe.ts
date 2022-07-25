import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twelveHourFormat'
})
export class TwelveHourFormatPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    value = +value;
    if(value > 12) {
      value = value-12;
    }
    if(value < 10) {
      value = `0${value}`
    }
    return value;
  }

}
