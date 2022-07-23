import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DURATION_FILTERS } from '../book-per-schedule/book-per-schedule.config';
import { BookPerScheduleService } from '../core/service/book-per-schedule.service';
import { CalenderService } from '../core/service/calender.service';

@Component({
  selector: 'app-date-range-slider',
  templateUrl: './date-range-slider.component.html',
  styleUrls: ['./date-range-slider.component.scss']
})
export class DateRangeSliderComponent implements OnInit {

  public activeDate: any;
  public midDateOfWeek: any;
  public durationFilter: any = DURATION_FILTERS;
  public highlistDateFilterList = [DURATION_FILTERS.daily.id];
  
  @Input() todayDate: any; 
  @Input() appliedFilter: any;
  @Input() activeBookingEventDetails: any = [];
  @Input() dateRangeList: any = [];
  @Input() daysDiffFromToday: number = 0;
  @Output() dateRangeListChange = new EventEmitter();
  @Output() daysDiffFromTodayChange = new EventEmitter();
  @Output() onSelectedRangeOnCalender = new EventEmitter();
  public firstDayOfCurrentMonth = this.calenderService.getFirstDayOfCurrentMonth(); 


  constructor(
    private calenderService: CalenderService,
    public bookPerScheduleService: BookPerScheduleService) { }

  ngOnInit(): void {
  }

  getPreviousDays() {
    if(this.appliedFilter.id == DURATION_FILTERS.daily.id) {
      let firstDateOfWeek: any = new Date(this.calenderService.convertDateInto_MMDDYYYY(this.dateRangeList[0].formatDate));
      firstDateOfWeek.setDate(firstDateOfWeek.getDate() - 1);
      this.updateDetailsForWeekCalender(firstDateOfWeek);
      this.updateDaysDiffForWeekCalender();
      this.midDateOfWeek = this.calenderService.getDateStringFromDate(new Date().setDate(firstDateOfWeek.getDate() + 3));
    } else if(this.appliedFilter.id == DURATION_FILTERS.weekly.id) {
      let firstDateOfWeek: any = new Date(this.calenderService.convertDateInto_MMDDYYYY(this.dateRangeList[0].formatDate));
      firstDateOfWeek.setDate(firstDateOfWeek.getDate() - 7);
      this.updateDetailsForWeekCalender(firstDateOfWeek);
      this.updateDaysDiffForWeekCalender();
      this.onSelectedRangeOnCalender.emit();
    } else if(this.appliedFilter.id == DURATION_FILTERS.monthly.id) {
      let firstDateOfMonth: any = new Date(this.calenderService.convertDateInto_MMDDYYYY(this.dateRangeList[0].formatDate));
      firstDateOfMonth.setMonth(firstDateOfMonth.getMonth() - 1);
      this.updateDetailsForMonthCalender(firstDateOfMonth);
      this.onSelectedRangeOnCalender.emit();
    }
  }
  
  getForwardDays() {
    if(this.appliedFilter.id == DURATION_FILTERS.daily.id) {
      let firstDateOfWeek: any = new Date(this.calenderService.convertDateInto_MMDDYYYY(this.dateRangeList[0].formatDate));
      firstDateOfWeek.setDate(firstDateOfWeek.getDate() + 1);
      this.updateDetailsForWeekCalender(firstDateOfWeek);
      this.updateDaysDiffForWeekCalender();
      this.midDateOfWeek = this.calenderService.getDateStringFromDate(new Date().setDate(firstDateOfWeek.getDate() + 3));
    } else if(this.appliedFilter.id == DURATION_FILTERS.weekly.id) {
      let firstDateOfWeek: any = new Date(this.calenderService.convertDateInto_MMDDYYYY(this.dateRangeList[0].formatDate));
      firstDateOfWeek.setDate(firstDateOfWeek.getDate() + 7);
      this.updateDetailsForWeekCalender(firstDateOfWeek);
      this.updateDaysDiffForWeekCalender();
      this.onSelectedRangeOnCalender.emit();
    } else if(this.appliedFilter.id == DURATION_FILTERS.monthly.id) {
      let firstDateOfMonth: any = new Date(this.calenderService.convertDateInto_MMDDYYYY(this.dateRangeList[0].formatDate));
      firstDateOfMonth.setMonth(firstDateOfMonth.getMonth() + 1);
      this.updateDetailsForMonthCalender(firstDateOfMonth);
      this.onSelectedRangeOnCalender.emit();
    }
  }

  updateDetailsForWeekCalender(startingDate: any) {
    this.activeDate = startingDate ? startingDate: (this.activeDate ? this.activeDate: new Date());
    this.dateRangeList = this.calenderService.getWeekList1(this.calenderService.getDateStringFromDate(this.activeDate), 'dd/mm/yyyy');
    this.dateRangeListChange.emit(this.dateRangeList);
    this.bookPerScheduleService.updateFilterRangeInService(this.appliedFilter.id, this.dateRangeList);
  }

  updateDetailsForMonthCalender(startingDate?: any, dateFormat: any = 'dd/mm/yyyy') {
    this.activeDate = startingDate ? startingDate: (this.activeDate ? this.activeDate: new Date());
    this.dateRangeList = this.calenderService.getmonthDaysList1(this.calenderService.getDateStringFromDate(this.activeDate));
    this.dateRangeListChange.emit(this.dateRangeList);
    this.bookPerScheduleService.updateFilterRangeInService(this.appliedFilter.id, this.dateRangeList);
  }

  updateDaysDiffForWeekCalender(dateRangeList?: any[]) {
      this.daysDiffFromToday = this.calenderService.getDayDifferenceBetweenDates(this.todayDate, (dateRangeList? dateRangeList[3].formatDate:this.dateRangeList[3].formatDate), 'dd/mm/yyyy', 'dd/mm/yyyy');
      this.daysDiffFromTodayChange.emit(this.daysDiffFromToday);
  }

}
