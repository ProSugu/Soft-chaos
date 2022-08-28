import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { MatMenuTrigger } from '@angular/material/menu';import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
;
import { ApiService } from '../core/service/api.service';
import { BookPerScheduleService } from '../core/service/book-per-schedule.service';
import { CalenderService } from '../core/service/calender.service';
import { DeviceService } from '../core/service/device.service';
import { BOOKING_EVENTS_API_RESPONSE_KEYS, DEFAULT_DATE_RANGE_LIST, DEVICE_WISE_FILTER, DURATION_FILTERS } from './book-per-schedule.config';
@Component({
  selector: 'app-book-per-schedule',
  templateUrl: './book-per-schedule.component.html',
  styleUrls: ['./book-per-schedule.component.scss']
})
export class BookPerScheduleComponent implements OnInit, OnDestroy {

  public todayDate: any;
  public todayDateJsObj: any = new Date();
  public durationFilter: any = DURATION_FILTERS;
  public appliedFilter = DURATION_FILTERS.daily;
  public totalFilterList: any[] | undefined;
  public requestingServerForBannerText = false;
  public locationFilterList: any = [];
  public bookingEventDetails: any;
  public activeBookingEventDetails: any[] = DEFAULT_DATE_RANGE_LIST;
  public dateRangeList: any[] = [];
  public bookEventColourDetails: any = {};
  public clickedLocationInfo:any;
  public isLocationPopupActive:boolean = false;
  public scrollChangeSubs:Subscription | undefined;
  @ViewChild('stickyHeader', {static:true}) stickyHeader:any;
  @ViewChild('dropdownMenuButton', {static:true}) dropdownMenuButton:any;
  @ViewChild('dateRangePicker', {static:true}) dateRangePicker:any;
  @ViewChild('dateRangeSlider', {static:false}) dateRangeSlider:any;
  @ViewChild(MatMenuTrigger) trigger: any;
  public date = new FormControl();
  public selectedLocationFilterList: any[] = [];
  public daysDiffFromToday: any;
  public selectedDateRange: any;

  constructor(
    private apiService: ApiService,
    private deviceService: DeviceService,
    public calenderService: CalenderService,
    private cdRef: ChangeDetectorRef,
    private titleService: Title,
    public bookPerScheduleService: BookPerScheduleService) { }

  ngOnInit(): void {
    this.todayDate = this.calenderService.getDateStringFromDate(new Date());
    this.date.setValue(this.todayDateJsObj);
    this.dateRangeList = this.calenderService.getDaysListByFilter(this.appliedFilter.id);
    this.loadBannerText();
    this.getBookingEventList();
    this.totalFilterList = DEVICE_WISE_FILTER[this.deviceService.deviceType];
    this.bookPerScheduleService.activeFilterId = this.appliedFilter.id;
    this.scrollChangeSubscription();
    this.titleService.setTitle("soft chaos-book-per-schedule")

  }

  scrollChangeSubscription() {
    this.scrollChangeSubs = this.deviceService.scrollPositionChange.subscribe(()=>{
      if (this.deviceService.scrollY > 10) {
        this.stickyHeader.nativeElement.classList.add("sticky-top");
      } else {
        this.stickyHeader.nativeElement.classList.remove("sticky-top");
      }
    })
  }

  getPreviousDays() {
    this.dateRangeSlider.getPreviousDays();
  }
  
  getForwardDays() {
    this.dateRangeSlider.getForwardDays();
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  loadBannerText() {
    this.requestingServerForBannerText = true;
    setTimeout(() => {
      this.apiService.getBannerTextList().subscribe((response: any) => {
        this.locationFilterList = response.section;
        this.selectedLocationFilterList = this.locationFilterList;
        this.locationFilterList.forEach((elm: any) => {
          this.bookEventColourDetails[elm.id] = elm.bookEventColor;
        })
        this.requestingServerForBannerText = false;
      })
    }, 1000)
  }

  getBookingEventList() {
    this.apiService.getBookPerData().subscribe((response: any) => {
      this.bookingEventDetails = response;
      this.activeBookingEventDetails = this.bookingEventDetails[BOOKING_EVENTS_API_RESPONSE_KEYS[this.appliedFilter.id]];
    })
  }

  onSelectDurationFilter(event: any, menu1: any, filter: any) {
    event.stopPropagation();
    this.trigger.closeMenu();
    this.onDurationFilterChange(filter);
  }

  onDurationFilterChange(newFilter: any) {
    if(this.appliedFilter.id != newFilter.id) {
      this.appliedFilter = newFilter;
      this.activeBookingEventDetails = this.bookingEventDetails[BOOKING_EVENTS_API_RESPONSE_KEYS[this.appliedFilter.id]];
      this.dateRangeList = this.calenderService.getDaysListByFilter(this.appliedFilter.id);
      this.updateSelectedRangeOnCalender();
      this.bookPerScheduleService.activeFilterId = this.appliedFilter.id;
      this.restoreFilterService();
      this.bookPerScheduleService.updateFilterRangeInService(this.appliedFilter.id, this.dateRangeList);
      if(this.deviceService.scrollEventFn) this.deviceService.scrollEventFn.target.scrollTop = 0;
    }
  }

  updateSelectedRangeOnCalender() {
    if([this.durationFilter.weekly.id, this.durationFilter.monthly.id].includes(this.appliedFilter.id)) {
      this.selectedDateRange = new DateRange( new Date(this.calenderService.convertDateInto_MMDDYYYY(this.dateRangeList[0].formatDate)), new Date(this.calenderService.convertDateInto_MMDDYYYY(this.dateRangeList[this.dateRangeList.length-1].formatDate)));
    }
  }

  onLocationFilterChange(event:any, filter: any) {
    event.checked && this.selectedLocationFilterList.push(filter);
    if(!event.checked) {
      this.selectedLocationFilterList = this.selectedLocationFilterList.filter((elm) => elm.id != filter.id);
    }
  }

  restoreFilterService() {
    this.bookPerScheduleService.activeFilterDate = '';
    this.bookPerScheduleService.activeWeeklyFilterRange = {startDate: '', endDate: ''};
    this.bookPerScheduleService.activeMonthlyFilterRange = {startDate: '', endDate: ''};
    this.date.setValue('');
  }

  getDateFilterRange(event: any) {
    document.getElementById('dropdownMenuButton')?.click();
    this.date.setValue(event);
    this.dateRangeList = this.calenderService.getDaysListByFilter(this.appliedFilter.id, this.calenderService.getDateStringFromDate(new Date(event)), 'dd/mm/yyyy');
    this.dateRangeSlider.updateDaysDiffForWeekCalender(this.dateRangeList);
  }

  calenderRangeSelected(event: any, filterType: any) {
    if(filterType == this.durationFilter.weekly.id) {
      this.dateRangeList = this.calenderService.getWeekList1(event.startDate);
      this.bookPerScheduleService.updateFilterRangeInService(this.appliedFilter.id, this.dateRangeList);
    } else if(filterType == this.durationFilter.monthly.id) {
      this.dateRangeList = this.calenderService.getmonthDaysList1(event.startDate);
      this.bookPerScheduleService.updateFilterRangeInService(this.appliedFilter.id, this.dateRangeList);
    }
  }

  onExploreTour() {
    this.isLocationPopupActive = false;
  }

  ngOnDestroy(): void {
    this.scrollChangeSubs?.unsubscribe();
  }
}
