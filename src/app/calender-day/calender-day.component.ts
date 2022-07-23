import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TIME_SLOTS } from '../core/config/device.config';
import { BookPerScheduleService } from '../core/service/book-per-schedule.service';
import { CalenderService } from '../core/service/calender.service';

@Component({
  selector: 'app-calender-day',
  templateUrl: './calender-day.component.html',
  styleUrls: ['./calender-day.component.scss']
})
export class CalenderDayComponent implements OnInit {

  public readonly TIME_SLOTS = TIME_SLOTS;
  @Input() todayDate: any;
  @Input() activeBookingEventDetails: any;
  @Input() dateRangeList: any[] = [];
  @Input() bookEventColourDetails: any = {};
  @Input() selectedLocationFilterList: any[] = [];
  public selectedDate: any;
  @Output() viewLocation = new EventEmitter();

  constructor(
    public calenderService: CalenderService,
    private bookPerScheduleService: BookPerScheduleService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.dateRangeList.length) {
      this.selectedDate = this.dateRangeList[3].formatDate;
      this.bookPerScheduleService.activeFilterDate = this.selectedDate;
    }
  }

  getDayWiseEvent(date: any) {
    if(date) {
      const event = this.activeBookingEventDetails.find((elm: any) => elm.date == date);
      return event ? event.slots.filter((elm: any) => this.selectedLocationFilterList.some((elm1) => elm1.id == elm.eventLocationDetail.locationId)): [];
    } else {
      return [];
    }
  }

  getSlotDetail(slotTime: any, slots: any) {
    return slots.find((elm: any) => elm.eventStartTime.hour == slotTime);
  }

  viewEvent(eventDetail:any, rowIndex: number, isEventMissed: boolean){
    if(eventDetail && eventDetail.eventLocationDetail) {
      const locationCard = {...eventDetail.eventLocationDetail, id:eventDetail.eventLocationDetail.locationId, isEventMissed};
      this.viewLocation.emit(locationCard);
    }
  }

}
