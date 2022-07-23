import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TIME_SLOTS } from '../core/config/device.config';
import { CalenderService } from '../core/service/calender.service';

@Component({
  selector: 'app-calender-week',
  templateUrl: './calender-week.component.html',
  styleUrls: ['./calender-week.component.scss']
})
export class CalenderWeekComponent implements OnInit {

  public readonly TIME_SLOTS = TIME_SLOTS;
  @Input() todayDate: any;
  @Input() activeBookingEventDetails: any;
  @Input() bookEventColourDetails: any = {};
  @Input() dateRangeList: any = [];
  @Input() selectedLocationFilterList: any[] = [];
  @Output() viewLocation = new EventEmitter();

  constructor(
    public calenderService: CalenderService
  ) { }

  ngOnInit(): void {
  }

  getDayWiseEvent(date: any) {
    const event = this.activeBookingEventDetails.find((elm: any) => elm.date == date);
    return event ? event.slots.filter((elm: any) => this.selectedLocationFilterList.some((elm1) => elm1.id == elm.eventLocationDetail.locationId)): [];
  }

  getSlotDetail(slotTime: any, slots: any) {
    return slots.find((elm: any) => elm.eventStartTime.hour == slotTime);
  }

  viewEvent(eventDetail:any, isEventMissed: boolean){
    if(eventDetail && eventDetail.eventLocationDetail) {
      const locationCard = {...eventDetail.eventLocationDetail, id:eventDetail.eventLocationDetail.locationId, isEventMissed};
      this.viewLocation.emit(locationCard);
    }
  } 

}
