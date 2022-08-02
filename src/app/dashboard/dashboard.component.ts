import {Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../core/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  homeSlider = ['assets/images/s1.png','assets/images/s2.png','assets/images/s3.png','assets/images/s1.png','assets/images/s2.png'];
  pageSlideAnimationActive = false;
  requestingServerForBannerText = false;
  requestingServerForLocations = false;
  bannerLocationList: any = [];
  dashboardData: any = [];
  horizontalSlideNumber: any = 1;
  VerticalSlideNumber: any = 1;
  leftSlideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    items :2,
    centerMode: true,
    vertical: true,
    dots: false,
    nav: false,
    infinite: false,
    margin:10,
    verticalSwiping: true,
    centerPadding: '75px',
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 1.2,
        }
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  };
  // bsConfig?: Partial<BsDatepickerConfig> = {
  //   containerClass:'theme-red'
  // };

  slideConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'dots': false,
    'arrows': false,
    'infinite': false
  };
  slideConfigSec = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    vertical: false,
    dots: false,
    infinite: false,
    adaptiveHeight: false,
    centerPadding: '30',
    variableWidth: false,
    prevArrow: false,
    nextArrow: false,
    nav: true,
    variableHeight: false,
    speed: 1000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1.5,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2.5,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
  };
  rightSlideConfig = {
    slidesToShow: 2.5,
    slidesToScroll: 1,
    centerMode: true,
    vertical: false,
    dots: true,
    infinite: false,
    adaptiveHeight: false,
    centerPadding: '30',
    variableWidth: true,
    variableHeight: true,
    speed: 1000,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1,
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
    ]
  };
  private verticalSliderInitRef: any;
  @ViewChild('slickModal1', { static: true }) verticalSliderDomRef: ElementRef | any;
  allLocations: any = [];

  constructor(
    private apiService: ApiService,
    private router:Router,) {
    this.loadDashboardData();
  }

  public loadDashboardData() : void {
    this.requestingServerForBannerText = true
    setTimeout(() => {
      this.apiService.getdashboardData().subscribe((response: any) => {
        this.dashboardData = response;
        this.requestingServerForBannerText = false;
      })
    }, 3000)
  }

  moveToSlide(slideIndex: number, carouselRef: any) {
    carouselRef.slickGoTo(slideIndex);
  }

  afterSlaveCarouselChange(event: any) {
    this.horizontalSlideNumber = event.currentSlide + 1;
  }

  public exploreTour(): void {
    this.router.navigate(['/','tour'])
  }
}


