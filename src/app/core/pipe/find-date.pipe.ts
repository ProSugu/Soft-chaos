import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findDate'
})
export class FindDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    const dayValue = value ? value.split('/')[0]: value;
    return dayValue;
  }

}
