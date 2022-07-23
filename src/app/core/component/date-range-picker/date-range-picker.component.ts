import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateRange, DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { DURATION_FILTERS } from 'src/app/book-per-schedule/book-per-schedule.config';
import { CalenderService } from '../../service/calender.service';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    }
  ]
})
export class DateRangePickerComponent implements OnInit {

  public durationFilter = DURATION_FILTERS;
  @Input() appliedFilter: any;
  @Output() dateRangeSelected = new EventEmitter();
  @Input() selectedDateRange: any;
  public firstDayOfCurrentMonth = this.calenderService.getFirstDayOfCurrentMonth();

  constructor(
    private calenderService: CalenderService
  ) { }

  ngOnInit(): void {
  }

  onSelectedChange(date: Date): void {
    let startDate = new Date(date);
    let endDate = new Date(date);
    if(this.appliedFilter.id == DURATION_FILTERS.monthly.id) {
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(endDate.getDate() - 1);
    } else if(this.appliedFilter.id == DURATION_FILTERS.weekly.id) {
      endDate.setDate(endDate.getDate() + 6);
    }
    this.selectedDateRange = new DateRange(startDate, endDate);
    this.dateRangeSelected.emit({startDate: this.calenderService.getDateStringFromDate(startDate), endDate: this.calenderService.getDateStringFromDate(endDate)});
  }
}
