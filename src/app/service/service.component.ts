import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../core/service/api.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  requestingServerForBannerText!: boolean;
  public data: any;

constructor(
    private apiService: ApiService,
    private titleService:Title,
  ) { }

  ngOnInit(): void {
    this.loaddata();
    this.titleService.setTitle("soft chaos-services")
  }

  loaddata() {
    this.requestingServerForBannerText = true;
    setTimeout(() => {
      this.apiService.getServiceData().subscribe((response: any) => {
        this.data = response;
        console.log(this.data);
        this.requestingServerForBannerText = false;
      })
    }, 3000)
  }
}

