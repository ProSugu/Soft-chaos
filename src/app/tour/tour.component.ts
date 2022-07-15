import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  public slideConfigSec = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'dots': true,
    'arrows': false,
    'infinite': true,
    vertical:true,
    speed: 1000
  };

  constructor() { }

  ngOnInit(): void {
  }

}
