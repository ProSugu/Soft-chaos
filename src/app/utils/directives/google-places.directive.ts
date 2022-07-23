import { Directive, ElementRef, OnInit, NgZone, Output, EventEmitter, OnDestroy } from '@angular/core';
declare var google:any;

@Directive({
  selector: '[appGooglePlaces]'
})

export class GooglePlacesDirective implements OnInit {

  private element: HTMLInputElement;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  constructor(
    private elRef: ElementRef,
    private ngZone: NgZone,
  ) {
    this.element = this.elRef.nativeElement;
  }

  ngOnInit() {

    const autocomplete = new google.maps.places.Autocomplete(this.element);
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.ngZone.run(() => {
          this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
        });
      });
  }

  getFormattedAddress(place) {
    const locationObj = {};
    for (let i in place.address_components) {
      let item = place.address_components[i];
      locationObj['formatted_address'] = place.formatted_address;
      if (item['types'].indexOf('locality') > -1) {
        locationObj['locality'] = item['long_name']
      } else if (item['types'].indexOf('administrative_area_level_1') > -1) {
        locationObj['admin_area_l1'] = item['short_name']
      } else if (item['types'].indexOf('street_number') > -1) {
        locationObj['street_number'] = item['short_name']
      } else if (item['types'].indexOf('route') > -1) {
        locationObj['route'] = item['long_name']
      } else if (item['types'].indexOf('country') > -1) {
        locationObj['country'] = item['long_name']
      } else if (item['types'].indexOf('postal_code') > -1) {
        locationObj['postal_code'] = item['short_name']
      }

    }
    locationObj['name'] = place.name;
    if(!!place.geometry) {
      locationObj['lat'] = place.geometry.location.lat();
      locationObj['lng'] = place.geometry.location.lng();
    }
    return locationObj;
  }

}
