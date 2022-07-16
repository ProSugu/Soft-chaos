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
  
  public slideConfigTes = {
    'slidesToShow': 3,
    'slidesToScroll': 3,
    'dots': false,
    'arrows': true,
    'infinite': true,
    vertical:false,
    speed: 1000,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,

        }
      },
      {
        breakpoint: 556,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    prevArrow: "<button type='button' matRipple class='slick-prev pull-right'><img src='assets/images/left-arrow.png'></button>",
    nextArrow: "<button type='button' matRipple class='slick-next pull-right'><img src='assets/images/right-arrow.png'></button>",
  };


  public slideConfigCar = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'dots': false,
    'arrows': true,
    'infinite': true,
    vertical:false,
    speed: 1000,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,

        }
      },
      {
        breakpoint: 556,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    prevArrow: "<button type='button' matRipple class='slick-prev pull-right'><img src='assets/images/left-arrow.png'></button>",
    nextArrow: "<button type='button' matRipple class='slick-next pull-right'><img src='assets/images/right-arrow.png'></button>",
  };
  constructor() { }

  ngOnInit(): void {
  }

}
