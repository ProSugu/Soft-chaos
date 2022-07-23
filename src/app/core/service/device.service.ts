import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DEVICE_TYPE } from '../config/device.config';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  public scrollY:any;
  public scrollPositionChange = new Subject();
  private activeScreenType = 'unknown';
  public scrollEventFn: any; //Storing the window scroll function reference

  constructor() {
    this.setDeviceType(window.innerWidth);
  }

  isMobile() {
    return window.innerWidth < 768;
  }

  isTablet() {
    return window.innerWidth >= 768 && window.innerWidth <= 992;
  }

  isDeskop() {
    return window.innerWidth > 992;
  }

  get deviceType() {
    return this.activeScreenType;
  }

  setDeviceType (screenWidth: number) {
    if(screenWidth < 768) {
      this.activeScreenType = DEVICE_TYPE.mobile;
    } else if(screenWidth >= 768 && screenWidth <= 992) {
      this.activeScreenType = DEVICE_TYPE.tablet;
    } else{
      this.activeScreenType = DEVICE_TYPE.desktop;
    }
  }
}
