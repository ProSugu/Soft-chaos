import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from '../core/service/api.service';
import { Title } from "@angular/platform-browser";
import { EMPTY_BANNER_TEXT_MODAL } from 'src/assets/constants/main-containt';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

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
    'arrows': true,
    'infinite': false
  };
  slideConfigSec = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'dots': true,
    'arrows': false,
    'infinite': true,
    vertical:true,
    speed: 1000
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
    ],
    prevArrow: "<button type='button' matRipple class='slick-prev pull-left'><img width='30px' height='30px' src='assets/images/arrow-left.jpeg'></button>",
    nextArrow: "<button type='button' matRipple class='slick-next pull-right'><img width='30px' height='30px' src='assets/images/arrow-right.jpeg'></button>",
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

  public checkData(): void {
    this.router.navigate(['/','booking'])
  }
}


