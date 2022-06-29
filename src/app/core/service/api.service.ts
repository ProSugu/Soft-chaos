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
}
