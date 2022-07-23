import { Component, HostListener, ViewChild } from '@angular/core';
import { ApiService } from './core/service/api.service';
import { DeviceService } from './core/service/device.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public headerList = [];
  public scrollPosition: any;
  title = 'soft-chaos';

  constructor(private apiService: ApiService,
    private deviceService: DeviceService) {
    window.addEventListener('scroll', this.scroll, true);
    this.loadHeader();
  }

  scroll = (event: any): void => {
    this.deviceService.scrollEventFn = event;
    this.scrollPosition = event.target.scrollTop;
    this.deviceService.scrollY = this.scrollPosition;
    this.deviceService.scrollPositionChange.next(true);    
  };

  loadHeader() {
    this.apiService.getHeaders().subscribe((response: any) => {
      this.headerList = response.header;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.deviceService.setDeviceType(event.target.innerWidth);
  }
}

