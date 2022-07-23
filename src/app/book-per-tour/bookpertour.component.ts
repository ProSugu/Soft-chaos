import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from '../core/service/api.service';
import { Title } from "@angular/platform-browser";
import { EMPTY_BANNER_TEXT_MODAL } from 'src/assets/constants/main-containt';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { HORIZONTAL_SLIDER_CONFIG, VERTICAL_SLIDER_CONFIG } from './bookpertour.config';

@Component({
  templateUrl: './bookpertour.component.html',
  styleUrls: ['./bookpertour.component.scss']
})
export class BookPerTourComponent implements OnInit {

  pageSlideAnimationActive = false;
  requestingServerForBannerText = false;
  requestingServerForLocations = false;
  bannerLocationList: any = [];
  bannerTextList: any = [];
  horizontalSlideNumber: any = 1;
  VerticalSlideNumber: any = 1;
  leftSlideConfig = VERTICAL_SLIDER_CONFIG;
  rightSlideConfig = HORIZONTAL_SLIDER_CONFIG;
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
