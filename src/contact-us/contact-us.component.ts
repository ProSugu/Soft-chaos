import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { } from 'googlemaps';
import { MapStyle } from './mapstyles';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElement!: ElementRef<HTMLInputElement>;
  map!: google.maps.Map;
  mapLoad: boolean = true;
  mapStyle: any = MapStyle;
  contactForm!: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.contactForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.addMapsScript();
  }
  loadMap() {
    var marker: any;
    const mapProperties = {
      center: new google.maps.LatLng(14.603048733789002, 121.01333),
      zoom: 17,
      zoomControl:false,
      mapTypeControl:false,
      scrollwheel: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    var contentString =
      '<div id="content" style="margin:10px 10px 10px 5px;line-height: 1;overflow: hidden;white-space: nowrap;height:60px;margin:10px"><h3 style="font-weight:800">Soft Chos</h3><p>425 Pina Street 1000, Manila, Philippines</p></div>';
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );
    marker = new google.maps.Marker({
      map: this.map,
      icon: '/assets/images/drone.png',
      animation: google.maps.Animation.BOUNCE,
      position: mapProperties.center,
    });
    this.map.setOptions({ styles: this.mapStyle['silver'] });
    this.addInfoWindow(this.map, marker, contentString);
    this.mapLoad = false;
  }
  addInfoWindow(map: any, marker: any, message: any) {
    var infoWindow = new google.maps.InfoWindow({
      content: message,
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
    });
  }
  submit() {
    // this.recaptchaV3Service.execute('importantAction')
    // .subscribe((token) => this.handleToken(token));
    // this.recaptchaService.execute({ action: 'submit' }).then((token) => {
    //   console.log(token);
    // });
    console.log(this.contactForm.value);
  }
  onCaptchaExpired(event: any) {
    console.log(event);
  }

  onCaptchaResponse(event: any) {
    console.log(event);
  }
  addMapsScript() {
    let googleMapsUrl = environment.googleMap.siteKey;
    if (!document.querySelectorAll(`[src="${googleMapsUrl}"]`).length) {
      document.body.appendChild(
        Object.assign(document.createElement('script'), {
          type: 'text/javascript',
          src: googleMapsUrl,
          onload: () => this.loadMap(),
        })
      );
    } else {
      this.loadMap();
    }
  }
}
