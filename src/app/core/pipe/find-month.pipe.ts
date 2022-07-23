import { Pipe, PipeTransform } from '@angular/core';
import { months } from 'src/app/book-per-schedule/book-per-schedule.config';

@Pipe({
  name: 'findMonth'
})
export class FindMonthPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const dateValue = value ? value.split('/'): [];
    if(dateValue.length == 3) {
      const findDate: any = new Date(`${dateValue[1]}/${dateValue[0]}/${dateValue[2]}`);
      return months[findDate.getMonth()];
    } else {
      return value;
    }
  }

}
