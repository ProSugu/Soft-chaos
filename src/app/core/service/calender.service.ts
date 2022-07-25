import { Injectable } from '@angular/core';
import { DURATION_FILTERS, months, weekDay } from 'src/app/book-per-schedule/book-per-schedule.config';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

  constructor() { }

  getOneMonthDaysListFromToday() {
    const todayDate: any = new Date();
    const nextMonth: any = new Date(todayDate.getFullYear(), todayDate.getMonth()+1, todayDate.getDate());
    console.log(nextMonth)
    const diffTime = Math.abs(nextMonth - todayDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    let daysList: any[] = [];
    Array(diffDays).fill(1).forEach((elm, i) => {
      daysList.push({
        date: todayDate.getDate(),
        day: this.WEEK_DAYS[todayDate.getDay()],
        formatDate: `${todayDate.getMonth()+1}/${todayDate.getDate()}/${todayDate.getFullYear()}`
      })
      todayDate.setDate(todayDate.getDate()+1);
    })
    return daysList;
  }

  differenceBetweenTwoDates(date1: any, date2: any) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  }

  getTodayDay() {
    const todayDate = new Date();
    return weekDay[todayDate.getDay()];
  }

  getDay(checkDate: any) {
    const dateObj = new Date(checkDate);
    return weekDay[dateObj.getDay()];
  }
  
  getMonthFromDate(checkDate: any) {
    const dateObj = new Date(checkDate);
    return months[dateObj.getMonth()+1];
  }

  getFirstDayOfCurrentMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  getDateStringFromDate(dateObj: any) {
    const date = new Date(dateObj);
    const [dd, mm, yyyy] = [date.getDate(), date.getMonth()+1, date.getFullYear()] 
    return `${dd < 10 ? '0'+dd : dd}/${mm < 10 ? '0'+mm: mm }/${yyyy}`;
  }

  getDaysListByFilter(appliedFilterId: any, startingDate?: any, startingDateFormat: any = 'dd/mm/yyyy') {
    if(appliedFilterId === DURATION_FILTERS.daily.id) {
      return startingDate ? this.getWeekDaysList(startingDate, startingDateFormat): this.getWeekDaysList();
    } else if(appliedFilterId === DURATION_FILTERS.weekly.id) {
      return startingDate ? this.getWeekDaysList(startingDate, startingDateFormat): this.getWeekDaysList();
    } else if(appliedFilterId === DURATION_FILTERS.monthly.id) {
      const todayDate = new Date();
      const firstDayOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
      startingDate = startingDate? startingDate: this.getDateStringFromDate(firstDayOfMonth)
      return this.getmonthDaysList1(startingDate, startingDateFormat); 
    }
  }

  getWeekDaysList(customDate?: any, format?: any) {
    let ngDate = customDate ? new Date(customDate): new Date();
    if(customDate) {
      if(format == 'mm/dd/yyyy') {
        ngDate = new Date(customDate)
      } else if(format == 'dd/mm/yyyy') {
        const arr = customDate.split('/');
        ngDate = new Date(`${arr[1]}/${arr[0]}/${arr[2]}`)
      }
    } else {
      ngDate = new Date();
    }
    ngDate.setDate(ngDate.getDate() + 4);
    return Array(7).fill(1).map((elm, i) => {
      ngDate.setDate(ngDate.getDate() - 1);
      const [dd, mm, yyyy] = [new Date(ngDate).getDate(), new Date(ngDate).getMonth()+1, new Date(ngDate).getFullYear()] 
      return {
        dd,
        mm,
        yyyy,
        formatDate: `${dd < 10 ? '0'+dd : dd}/${mm < 10 ? '0'+mm: mm }/${yyyy}`,
        weekDay: weekDay[ngDate.getDay()]
      }
    }).reverse();
  }

  // accepting monthNo: 1-12
  getmonthDaysList(monthNo: number, year: number) {
    let monthDays: any= [];
    const firstDayOfMonth = new Date(year, monthNo-1, 1);
    Array(31).fill(1).forEach((elm, i) => {
      const newDaysMonthNo = firstDayOfMonth.getMonth() + 1;
      const [dd, mm, yyyy] = [new Date(firstDayOfMonth).getDate(), new Date(firstDayOfMonth).getMonth()+1, new Date(firstDayOfMonth).getFullYear()] 
      if(monthNo == newDaysMonthNo) {
        monthDays.push({
          dd,
          mm,
          yyyy,
          formatDate: `${dd < 10 ? '0'+dd : dd}/${mm < 10 ? '0'+mm: mm }/${yyyy}`,
          weekDay: weekDay[firstDayOfMonth.getDay()]
        })
      }
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    })
    return monthDays;
  }

  getWeekList1(startDate: any, dateFormat: any = 'dd/mm/yyyy') {
    let weekDays: any = [];
    if(dateFormat == 'dd/mm/yyyy') {
      startDate = this.convertDateInto_MMDDYYYY(startDate);
    }
    startDate = new Date(startDate);
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);
    const [startFormatDate, endFormatDate] = [this.getDateStringFromDate(startDate), this.getDateStringFromDate(endDate)]
    const totalDays = this.getDayDifferenceBetweenDates(startFormatDate, endFormatDate);
    Array(totalDays).fill(1).forEach((elm, i) => {
      const [dd, mm, yyyy] = [new Date(startDate).getDate(), new Date(startDate).getMonth()+1, new Date(startDate).getFullYear()];
      weekDays.push({
        dd,
        mm,
        yyyy,
        formatDate: `${dd < 10 ? '0'+dd : dd}/${mm < 10 ? '0'+mm: mm }/${yyyy}`,
        weekDay: weekDay[startDate.getDay()]
      });
      startDate.setDate(startDate.getDate() + 1);
    })
    return weekDays;
  }

  getmonthDaysList1(startDate: any, dateFormat: any = 'dd/mm/yyyy') {
    let monthDays: any = [];
    if(dateFormat == 'dd/mm/yyyy') {
      startDate = this.convertDateInto_MMDDYYYY(startDate);
    }
    startDate = new Date(startDate);
    let endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    const [startFormatDate, endFormatDate] = [this.getDateStringFromDate(startDate), this.getDateStringFromDate(endDate)]
    const totalDays = this.getDayDifferenceBetweenDates(startFormatDate, endFormatDate);
    Array(totalDays).fill(1).forEach((elm, i) => {
      const [dd, mm, yyyy] = [new Date(startDate).getDate(), new Date(startDate).getMonth()+1, new Date(startDate).getFullYear()];
      monthDays.push({
        dd,
        mm,
        yyyy,
        formatDate: `${dd < 10 ? '0'+dd : dd}/${mm < 10 ? '0'+mm: mm }/${yyyy}`,
        weekDay: weekDay[startDate.getDay()]
      });
      startDate.setDate(startDate.getDate() + 1);
    })
    return monthDays;
  }

  convertDateInto_MMDDYYYY = (date: any) => {
    const splitDate = date.split('/');
    return `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
  }

  convertDateInto_YYYYMMDD = (date: any, dateFormat: any) => {
    if(dateFormat == 'dd/mm/yyyy') {
      const splitDate = date.split('/');
      return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
    } else if(dateFormat == 'mm/dd/yyyy') {
      const splitDate = date.split('/');
      return `${splitDate[2]}/${splitDate[0]}/${splitDate[1]}`;
    } else {
      return '';
    }
  }

  getDayDifferenceBetweenDates(date1: any, date2: any, date1Format: any = 'dd/mm/yyyy', date2Format: any = 'dd/mm/yyyy') {
    if(date1Format == 'dd/mm/yyyy') {
      date1 = this.convertDateInto_MMDDYYYY(date1);
    }
    if(date2Format == 'dd/mm/yyyy') {
      date2 = this.convertDateInto_MMDDYYYY(date2);
    }
    const firstDate: any = new Date(date1);
    const secondDate: any = new Date(date2);
    const diffTime = Math.abs(secondDate - firstDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  }

  isFirstDateGreaterThanSecond(date1: any, date2: any, date1Format: any = 'dd/mm/yyyy', date2Format: any = 'dd/mm/yyyy') {
    if(date1Format == 'dd/mm/yyyy') {
      date1 = this.convertDateInto_MMDDYYYY(date1);
    }
    if(date2Format == 'dd/mm/yyyy') {
      date2 = this.convertDateInto_MMDDYYYY(date2);
    }
    const firstDate: any = new Date(date1);
    const secondDate: any = new Date(date2);
    return firstDate > secondDate;
  }

  isFirstTimeGreaterThanSecond(date1: any, date1Format: any, time1: any, date2: any, date2Format: any, time2: any) {
    const isLogAvailable = time1 != 'null:null';
    //time Format would be: HH:MM
    if(date1Format == 'dd/mm/yyyy') {
      date1 = this.convertDateInto_YYYYMMDD(date1, date1Format);
      isLogAvailable && console.log('a_event::', date1);
    }
    if(date1Format == 'mm/dd/yyyy') {
      date1 = this.convertDateInto_YYYYMMDD(date1, date1Format);
      isLogAvailable && console.log('b_event::', date1);
    }
    if(date2Format == 'dd/mm/yyyy') {
      date2 = this.convertDateInto_YYYYMMDD(date2, date2Format);
      isLogAvailable && console.log('a_today::', date2);
    }
    if(date2Format == 'mm/dd/yyyy') {
      date2 = this.convertDateInto_YYYYMMDD(date2, date2Format);
      isLogAvailable && console.log('b_today::', date2);
    }
    // date1 = date1.split('/').join('-')
    // date2 = date2.split('/').join('-')
    const firstDate = new Date(`${date1} ` + time1);
    isLogAvailable && console.log("event time:", `${date1} ` + time1)
    isLogAvailable && console.log("current time:", `${date2} ` + time2)
    isLogAvailable && console.log("event time:", firstDate);
    const secondDate = new Date(`${date2} ` + time2);
    isLogAvailable && console.log("current time:", secondDate);
    const result = firstDate.getTime() > secondDate.getTime();
    isLogAvailable && console.log("Is future event::", result);
    isLogAvailable && console.log("----------------------------------------------------");
    return result;
  }

  getCurrentTime() {
    const time = new Date();
    return time.getHours() + ":" + time.getMinutes();
  }
}
