import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../core/service/api.service';
import { Router } from '@angular/router';
import { OBJECTIVES_SLIDES } from './dashboard-section.constants';
import { DeviceService } from '../core/service/device.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  homeSlider = ['assets/images/s1.png', 'assets/images/s2.png', 'assets/images/s3.png', 'assets/images/s1.png', 'assets/images/s2.png'];
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
    items: 2,
    centerMode: true,
    vertical: true,
    dots: false,
    nav: false,
    infinite: false,
    margin: 10,
    verticalSwiping: true,
    centerPadding: '75px',
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
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

  // slideConfig = {
  //   'slidesToShow': 1,
  //   'slidesToScroll': 1,
  //   'dots': false,
  //   'arrows': false,
  //   'infinite': false,
  //   verticalSwiping: true,
  //   vertical: true
  // };

  slideConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'dots': false,
    'arrows': true,
    'infinite': false,
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
          slidesToShow:1,
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
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
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
  @ViewChild('slickModal', { static: true }) mainHeroSliderDomRef: ElementRef | any;
  allLocations: any = [];
  public readonly OBJECTIVE_SLIDES = OBJECTIVES_SLIDES;
  public gridGalleryImageList = [];

  constructor(
    private apiService: ApiService,
    public deviceService: DeviceService,
    private titleService:Title,
    private router: Router,) {
    this.loadDashboardData();
  }
  ngOnInit(): void {
    this.titleService.setTitle("soft chaos-Home")
  }
  debouncing(fn: any, d: number) {
    let timer: any;
    const scope = this;
    return function () {
      let context = scope;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, d);
    }
  }

  afterObjectiveCarouselChange(event: any, slaveCarousel: any) {
    this.VerticalSlideNumber = event.currentSlide + 1;
  }

  onVerticalSliderInit(e: any) {
    this.verticalSliderInitRef = e.event.target;
    // this.verticalSliderInitRef.addEventListener('wheel', this.debouncing(this.onVerticalSliderScroll, 10), { passive: false });
    this.verticalSliderInitRef.addEventListener('wheel', this.onVerticalSliderScroll, { passive: false });
  }

  onVerticalSliderScroll = (event: any): void => {
    if (event.deltaY < 0) {
      if (this.VerticalSlideNumber == 1) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      this.verticalSliderDomRef.slickPrev();
    } else {
      if (this.VerticalSlideNumber == this.OBJECTIVE_SLIDES.length) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      this.verticalSliderDomRef.slickNext();
    }
  };

  public loadDashboardData(): void {
    this.requestingServerForBannerText = true
    setTimeout(() => {
      this.apiService.getdashboardData().subscribe((response: any) => {
        this.dashboardData = response;
        this.requestingServerForBannerText = false;
        this.gridGalleryImageList = response.mainBannerImagesList.slice(0, 10);
      })
    }, 3000)
  }

  moveToSlide(slideIndex: number, carouselRef: any) {
    carouselRef.slickGoTo(slideIndex);
  }

  trackItem(index:number,item:string){
    return index;
  }

  afterSlaveCarouselChange(event: any) {
    this.horizontalSlideNumber = event.currentSlide + 1;
    this.mainHeroSliderDomRef.slickPlay();
  }

  public exploreTour(): void {
    this.router.navigate(['/', 'tour'])
  }

  isSectionInViewport(i: any) {
    var myElement: any = document.getElementById(`info${i}`);
    if(myElement) {
      var bounding = myElement.getBoundingClientRect();
      if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
        return true
      } else {
        return false;
      }
    }
    return false;
  };

}


