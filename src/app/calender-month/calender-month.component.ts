import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TIME_SLOTS } from '../core/config/device.config';
import { CalenderService } from '../core/service/calender.service';

@Component({
  selector: 'app-calender-month',
  templateUrl: './calender-month.component.html',
  styleUrls: ['./calender-month.component.scss']
})
export class CalenderMonthComponent implements OnInit, OnChanges {

  public readonly TIME_SLOTS = TIME_SLOTS;
  @Input() todayDate: any;
  @Input() activeBookingEventDetails: any;
  @Input() dateRangeList: any = [];
  @Input() bookEventColourDetails: any = {};
  @Input() selectedLocationFilterList: any[] = [];
  public totalMonthDays:any;
  @Output() viewLocation = new EventEmitter();

  constructor(
    public calenderService: CalenderService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.totalMonthDays = this.activeBookingEventDetails && this.activeBookingEventDetails.length;
  }

  getDayWiseEvent(date: any) {
    const event = this.activeBookingEventDetails.find((elm: any) => elm.date == date);
    return event ? event.slots.filter((elm: any) => this.selectedLocationFilterList.some((elm1) => elm1.id == elm.eventLocationDetail.locationId)): [];
  }

  getSlotDetail(slotTime: any, slots: any) {
    return slots.find((elm: any) => elm.eventStartTime.hour == slotTime);
  }

  getInitital(text: string) {
    return (text.split(' ').map((word: any) => word[0])).join('');
  }

  viewEvent(eventDetail:any, isEventMissed: boolean){
    if(eventDetail && eventDetail.eventLocationDetail) {
      const locationCard = {...eventDetail.eventLocationDetail, id:eventDetail.eventLocationDetail.locationId, isEventMissed};
      this.viewLocation.emit(locationCard);
    }
  } 
}
