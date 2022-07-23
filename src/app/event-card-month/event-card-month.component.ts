import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-card-month',
  templateUrl: './event-card-month.component.html',
  styleUrls: ['./event-card-month.component.scss']
})
export class EventCardMonthComponent implements OnInit {
  @Input() initials:any;
  @Input() background:any;
  constructor() { }

  ngOnInit(): void {
  }

}
