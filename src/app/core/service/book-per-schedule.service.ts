import { Injectable } from '@angular/core';
import { DURATION_FILTERS } from 'src/app/book-per-schedule/book-per-schedule.config';

@Injectable({
  providedIn: 'root'
})
export class BookPerScheduleService {

  public activeFilterId: any;
  public activeFilterDate: any;
  public activeWeeklyFilterRange: any;
  public activeMonthlyFilterRange: any;

  constructor() { }

  updateFilterRangeInService(appliedFilterId: any, dateRangeList: any[]) {
    if(appliedFilterId == DURATION_FILTERS.weekly.id) {
      const startDate = dateRangeList.length ? dateRangeList[0].formatDate: '';
      const endDate = dateRangeList[dateRangeList.length-1].formatDate;
      this.activeWeeklyFilterRange = {
        startDate,
        endDate
      }
    }
    if(appliedFilterId == DURATION_FILTERS.monthly.id) {
      const startDate = dateRangeList.length ? dateRangeList[0].formatDate: '';
      const endDate = dateRangeList[dateRangeList.length-1].formatDate;
      this.activeMonthlyFilterRange = {
        startDate,
        endDate
      }
    }
  }
}
