import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    this.loaddata();
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

