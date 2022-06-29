import { Component, HostListener, ViewChild } from '@angular/core';
import { ApiService } from './core/service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public headerList = [];
  public scrollPosition: any;
  title = 'soft-chaos';

  constructor(private apiService: ApiService) {
    window.addEventListener('scroll', this.scroll, true);
    this.loadHeader();
  }

  scroll = (event: any): void => {
    this.scrollPosition = event.target.scrollTop;
  };

  loadHeader() {
    this.apiService.getHeaders().subscribe((response: any) => {
      this.headerList = response.header;
      console.log(this.headerList);
    })
  }
}

