import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../core/service/api.service';
import { CalenderService } from '../core/service/calender.service';
import { StoreService } from '../core/service/store.service';
import { REGEX } from './booking.component.constant';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class BookingComponent implements OnInit {

  public step = 1;
  selected: Date = new Date();
  public todayDate = new Date();
  public todayDetails: any;
  public dateAfterOneMonth: any;
  public monthList: any = [];
  public bookingTimeSlots: any = [];
  public selectedBookingDate!: number;
  public SelectedTimeSlotIndex!: number;
  public selectedDateControl = new FormControl(new Date());
  public contactInformationForm!: FormGroup;
  public paymentForm!: FormGroup;
  public countryList: any[] = [];
  public cityList: any[] = [];
  public regionList: any[] = [];
  public flagList: any[] = [];
  public tempCountryCodeList = [];

  slideConfigWeek = {
    'slidesToShow': 6,
    'slidesToScroll': 4,
    'dots': false,
    'arrows': true,
    'infinite': false,
    vertical:false,
    'margin':'10px',
    centerPadding: '10px',
    speed: 1000,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,

        }
      },
      {
        breakpoint: 556,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        }
      }
    ],
    prevArrow:
    "<button type='button' class='slick-prev pull-left'><img src='assets/images/gray-arrow-right.svg'></button>",
  nextArrow:
    "<button type='button' class='slick-next pull-right'><img src='assets/images/gray-arrow-right.svg'></button>",
  };
  
  constructor(
    private ngFb: FormBuilder,
    private apiService: ApiService,
    private calenderService: CalenderService,
    private storeService: StoreService) { 
    this.dateAfterOneMonth = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth()+1, this.todayDate.getDate())
  }

  ngOnInit(): void {
    this.initializeStepForms();
    this.populateMonthDaysInSlider();
    this.getBookingTimeSlotsDetails();
    this.getMasterData();
  }

  initializeStepForms() {
    this.contactInformationForm = this.ngFb.group({
      firstName: ['', [Validators.required, Validators.pattern(REGEX.name)]],
      lastName: ['', [Validators.required, Validators.pattern(REGEX.name)]],
      searchCountryCode: [''],
      countryForContact: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern(REGEX.contactNumber)]],
      email: ['', [Validators.required, Validators.pattern(REGEX.email)]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      region: ['', [Validators.required]]
    });
    this.paymentForm = this.ngFb.group({
      paymentType: ['1', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(REGEX.cardNumber)]],
      cardHolderName: ['', [Validators.required, Validators.pattern(REGEX.name)]],
      expiry: ['', [Validators.required, Validators.pattern(REGEX.cardExpiry)]],
      cvvNumber: ['', [Validators.required, Validators.pattern(REGEX.cvvOrCvc)]]
    })
    this.searchForCountryCodes();
    this.selectCountryCode( {
      "name": "India",
      "dial_code": "+91",
      "code": "IN"
    })
  }

  populateMonthDaysInSlider() {
    this.monthList = this.calenderService.getOneMonthDaysListFromToday();
    this.todayDetails = this.monthList[0];
    this.monthList.splice(0, 1);
  }

  searchForCountryCodes(){
    this.contactInformationForm.controls['searchCountryCode'].valueChanges.subscribe((val: any)=>{
      const searchValue = val && val.toLowerCase();
      const filteredList = this.tempCountryCodeList.filter((elm:any)=>{
        return [elm.name.toLowerCase(),elm.dial_code.toLowerCase()].some((elm)=>elm.includes(searchValue));
      });
      if(searchValue){
        this.flagList = filteredList;
      }else {
        this.flagList = this.tempCountryCodeList;
      }
    })
  }
  
  selectCountryCode(countryObj:any){
    this.contactInformationForm.controls['countryForContact'].setValue(countryObj);
    // this.contactInformationForm.controls['searchCountryCode'].setValue(this.contactInformationForm.controls['countryForContact'].value.name);
  }

  getMasterData() {
    this.getCountryList();
    this.getCityList();
    this.getRegionList();
    this.getFlagList();
  }

  getCountryList() {
    this.apiService.getCountryList().subscribe((response: any) => {
      this.countryList = response.countryList;
    })
  }

  getCityList() {
    this.apiService.getCityList().subscribe((response: any) => {
      this.cityList = response.cityList;
    })
  }

  getRegionList() {
    this.apiService.getRegionList().subscribe((response: any) => {
      this.regionList = response.regionList;
    })
  }

  getFlagList() {
    this.apiService.getFlagList().subscribe((response: any) => {
      this.flagList = response.flagList;
      this.tempCountryCodeList = response.flagList;
    })
  }

  getBookingTimeSlotsDetails() {
    this.apiService.getBookingSlotDetails(this.selectedDateControl.value, 'test').subscribe((response:any) => {
      this.bookingTimeSlots = response.bookingTimeSlots;
    })
  }

  hasStep2Error(controlName: string, errorName: string) {
    return this.contactInformationForm.controls[controlName].hasError(errorName);
  }

  hasStep3Error(controlName: string, errorName: string) {
    return this.paymentForm.controls[controlName].hasError(errorName);
  }

  onPaymentModeSelect(paymentMode: number) {
    this.paymentForm.controls['paymentType'].setValue(paymentMode);
    const cardTypeMandatoryControls = ['cardNumber', 'cardHolderName', 'expiry', 'cvvNumber'];
    if(paymentMode == 2) {
      cardTypeMandatoryControls.forEach((controlName) => {
        this.paymentForm.controls[controlName].disable();
      })
    } else {
      cardTypeMandatoryControls.forEach((controlName) => {
        this.paymentForm.controls[controlName].enable();
      })
    }
  }

  onTimeslotSelect(timeSlotIndex: any) {
    this.SelectedTimeSlotIndex = timeSlotIndex;
  }

  getControlValue(controlName: any) {
    return this.paymentForm.controls[controlName].value;
  }

  next():void {
    this.step++;
    window.scroll({
      // top: 124.16
      top: 0
    })
  }
  prev():void {
    this.step--;
    this.storeService.scrollRef.target.scrollTop = 0;
    window.scroll({
      // top: 124.16
      top: 0
    })
  }

  onBookingDateSelectFromSlider(dateObj?: any) {
    this.SelectedTimeSlotIndex = 0;
    if(!dateObj) {
      this.selectedDateControl.setValue(this.todayDate);
    } else {
      this.selectedDateControl.setValue(new Date(dateObj));
      console.log(new Date(dateObj))
    }
    this.getBookingTimeSlotsDetails();
  }
  
  onBookingDateSelect(event: any, progressbarRef: any) {
    this.SelectedTimeSlotIndex = 0;
    progressbarRef?.click();
    this.selectedBookingDate = this.calenderService.differenceBetweenTwoDates(new Date(), new Date(event));
    this.selectedDateControl.setValue(event);
    this.getBookingTimeSlotsDetails();
  }

  get isFirstStepDisabled() {
    return this.step == 1 && !this.SelectedTimeSlotIndex;
  }

  get isSecondStepDisabled() {
    return this.step == 2 && this.contactInformationForm.invalid;
  }

  get isThirdStepDisabled() {
    return this.step == 3 && this.paymentForm.invalid;
  }

}
