import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/service/api.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  slideConfig = {
    'slidesToShow': 3,
    'slidesToScroll': 1,
    'dots': false,
    'arrows': true,
    'infinite': false,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
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
          slidesToShow: 1,
        }
      }
    ],
  };
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
      this.apiService.getAboutUsData().subscribe((response: any) => {
        this.data = response;
        console.log(this.data);
        this.requestingServerForBannerText = false;
      })
    }, 3000)
  }
}
