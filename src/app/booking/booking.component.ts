import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  public step = 1;
  constructor() { }

  ngOnInit(): void {
  }

  next():void {
    this.step++;
  }
  prev():void {
    this.step--;
  }
}
