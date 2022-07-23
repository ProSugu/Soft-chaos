import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() style:any;
  @Input() background:any;
  @Input() type:any;
  @Input() slotDetails: any;
  constructor() { }

  ngOnInit(): void {
  }

}
