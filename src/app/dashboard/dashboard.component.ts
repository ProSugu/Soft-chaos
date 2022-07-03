import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from '../core/service/api.service';
import { Title } from "@angular/platform-browser";
import { EMPTY_BANNER_TEXT_MODAL } from 'src/assets/constants/main-containt';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewChecked {

  pageSlideAnimationActive = false;
  requestingServerForBannerText = false;
  requestingServerForLocations = false;
  bannerLocationList: any = [];
  bannerTextList: any = [];
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
          slidesToShow: 1.2,
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
          slidesToShow: 1.2,
        }
      }
    ],
    prevArrow: "<button type='button' matRipple class='slick-prev pull-left'><img width='30px' height='30px' src='assets/images/arrow-left.jpeg'></button>",
    nextArrow: "<button type='button' matRipple class='slick-next pull-right'><img width='30px' height='30px' src='assets/images/arrow-right.jpeg'></button>",
  };
  private verticalSliderInitRef: any;
  @ViewChild('slickModal1', { static: true }) verticalSliderDomRef: ElementRef | any;
  allLocations: any = [];

  constructor(private apiService: ApiService,
    private renderer: Renderer2,
    private titleService: Title,
    private cdref: ChangeDetectorRef) {
    this.loadBannerText();
  }

  ngOnInit(): void {
    console.log("")
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  onVerticalSliderInit(e: any) {
    this.verticalSliderInitRef = e.event.target;
    this.verticalSliderInitRef.addEventListener('wheel', this.onVerticalSliderScroll, { passive: false });
  }

  onVerticalSliderScroll = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();
    if (event.deltaY < 0) {
      this.verticalSliderDomRef.slickPrev();
    } else {
      if (this.VerticalSlideNumber < this.bannerTextList.length - 2) {
        this.verticalSliderDomRef.slickNext();
      }
    }
  };

  loadBannerText() {
    this.requestingServerForBannerText = true;
    setTimeout(() => {
      this.apiService.getBannerTextList().subscribe((response: any) => {
        this.bannerTextList = response.section;
        this.loadBannerLocations(response.section[0].id);
        this.titleService.setTitle(this.bannerTextList[0].heading);
        this.bannerTextList = [...this.bannerTextList, EMPTY_BANNER_TEXT_MODAL, EMPTY_BANNER_TEXT_MODAL]
        this.requestingServerForBannerText = false;
      })
    }, 1000)
  }

  loadBannerLocations(masterId: any) {
    this.requestingServerForLocations = true;
    this.bannerLocationList = [];
    setTimeout(() => {
      this.apiService.getNewLocationsForBanner().subscribe((response: any) => {
        this.allLocations = response.locations;
        const newListedLocations = response.locations.find((elm: any) => elm.id == masterId);
        this.bannerLocationList = newListedLocations && newListedLocations.locationResult || [];
        this.requestingServerForLocations = false;
      })
    }, 1000)
  }


  afterMasterCarouselChange(event: any, slaveCarousel: any) {
    this.VerticalSlideNumber = event.currentSlide + 1;
    const masterCarouselObj = this.bannerTextList[this.VerticalSlideNumber - 1];
    const newListedLocations = this.allLocations.find((elm: any) => elm.id == masterCarouselObj.id);
    this.bannerLocationList = newListedLocations && newListedLocations.locationResult || [];
    this.titleService.setTitle(masterCarouselObj.heading);
    slaveCarousel.slickGoTo(0);
  }

  afterSlaveCarouselChange(event: any) {
    this.horizontalSlideNumber = event.currentSlide + 1;
  }

  onBannerCountClick(masterCarousel: any, slaveCarousel: any, requestedSlideNumber: number) {
    if (requestedSlideNumber != this.VerticalSlideNumber - 1) {
      masterCarousel.slickGoTo(requestedSlideNumber);
      slaveCarousel.slickGoTo(0);
    }
  }

  showPageSlideAnimation() {
    this.pageSlideAnimationActive = true;
    setTimeout(() => {
      this.pageSlideAnimationActive = false;
    }, 500)
  }
}


