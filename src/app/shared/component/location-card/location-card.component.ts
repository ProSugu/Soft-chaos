import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent implements OnInit {

  @Input() isActive: boolean = false;
  @Input() locationInfo: any;
  @Input() openedFromCalender: any;
  @Output() onExploreTour = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  exploreTour(disabledEvent: boolean) {
    !disabledEvent && this.openedFromCalender && this.onExploreTour.emit();
  }
}
