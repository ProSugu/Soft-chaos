import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent implements OnInit {

  @Input() isActive: boolean = false;
  @Input() locationInfo: any;

  constructor() { }

  ngOnInit(): void {
  }
}
