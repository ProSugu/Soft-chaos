import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    return this.http.get('assets/mocks/headerList.json');
  }

  getNewLocationsForBanner() {
    return this.http.get('assets/mocks/newLocationList.json');
  }

  getBannerTextList() {
    return this.http.get('assets/mocks/bannerTextList.json');
  }
  
  getBookingSlotDetails(bookingDate: any, locationId: any) {
    return this.http.get('assets/mocks/bookingSlotDetails.json');
  }
  
  getCountryList() {
    return this.http.get('assets/mocks/countryList.json');
  }

  getCityList() {
    return this.http.get('assets/mocks/cityList.json');
  }

  getRegionList() {
    return this.http.get('assets/mocks/regionList.json');
  }

  getFlagList() {
    return this.http.get('assets/mocks/flags.json');
  }
  
  getBookPerData() {
    return this.http.get('assets/mocks/bookingEvents.json');
  }

  getAboutUsData() {
    return this.http.get('assets/mocks/aboutUs.json');
  }
  getdashboardData() {
    return this.http.get('assets/mocks/dashboard.json');
  }
}
