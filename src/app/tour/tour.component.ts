import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../core/service/api.service';
import * as Aos from 'aos';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss'],
  
})

export class TourComponent implements OnInit  {
  ngOnInit(){
    Aos.init();
  }
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
  requestingServerForBannerText = false;
  public tourData:any=  [];

  constructor(
    private _router: Router,
    private apiService: ApiService,
    ) {
      this.loadDashboardData();
    }

  goToBooking() {
    this._router.navigate(['/','booking']);
  }

  public loadDashboardData() : void {
    this.requestingServerForBannerText = true
    setTimeout(() => {
      this.apiService.getTourData().subscribe((response: any) => {
        this.tourData = response;
        this.requestingServerForBannerText = false;
      })
    }, 3000)
  }
}
