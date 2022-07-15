import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './core/component/header/header.component';
import { FooterComponent } from './core/component/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { TourComponent } from './tour/tour.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ServiceComponent } from './service/service.component';
import { BookingComponent } from './booking/booking.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OurServicesComponent } from './our-services/our-services.component';
import { JoinUsServiceComponent } from './join-us-service/join-us-service.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

const environmentConfig: any = environment.logger;

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, DashboardComponent, PageNotFoundComponent, TourComponent, JoinUsComponent, AboutUsComponent, ContactUsComponent, ServiceComponent, BookingComponent, OurServicesComponent, JoinUsServiceComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SlickCarouselModule,
    HttpClientModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel[environmentConfig.level],
    } as any),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgxDropzoneModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
