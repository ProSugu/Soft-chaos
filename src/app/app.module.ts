import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './core/component/header/header.component';
import { FooterComponent } from './core/component/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { TourComponent } from './tour/tour.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ServiceComponent } from './service/service.component';
import { BookingComponent } from './booking/booking.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OurServicesComponent } from './our-services/our-services.component';
import { JoinUsServiceComponent } from './join-us-service/join-us-service.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TwelveHourFormatPipe } from './core/pipe/twelve-hour-format.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalenderWeekComponent } from './calender-week/calender-week.component';
import { BookPerScheduleComponent } from './book-per-schedule/book-per-schedule.component';
import { EventCardComponent } from './event-card/event-card.component';
import { CalenderDayComponent } from './calender-day/calender-day.component';
import { CalenderMonthComponent } from './calender-month/calender-month.component';
import { EventCardMonthComponent } from './event-card-month/event-card-month.component';
import { DateRangeSliderComponent } from './date-range-slider/date-range-slider.component';
import { FindDatePipe } from './core/pipe/find-date.pipe';
import { FindDayPipe } from './core/pipe/find-day.pipe';
import { FindMonthPipe } from './core/pipe/find-month.pipe';
import { NgVarDirective } from './core/directive/ng-var.directive';
import { NumberOnlyDirective } from './core/directive/number-only.directive';
import { TextOnlyDirective } from './core/directive/text-only.directive';
import { DateRangePickerComponent } from './core/component/date-range-picker/date-range-picker.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookPerTourComponent } from './book-per-tour/bookpertour.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ToolboxListComponent } from './popup-list/toolbox-list/toolbox-list.component';
import { ErrorInterceptor } from './utils/interceptors/error.interceptor';
import { JwtInterceptor } from './utils/interceptors/jwt.interceptor';

const environmentConfig: any = environment.logger;


@NgModule({
  declarations: [AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    PageNotFoundComponent,
    TourComponent,
    JoinUsComponent,
    AboutUsComponent,
    ContactUsComponent,
    ServiceComponent,
    BookingComponent,
    OurServicesComponent,
    JoinUsServiceComponent,
    CalenderWeekComponent,
    BookPerScheduleComponent,
    EventCardComponent,
    CalenderDayComponent,
    CalenderMonthComponent,
    EventCardMonthComponent,
    DateRangeSliderComponent,
    FindDatePipe,
    FindDayPipe,
    FindMonthPipe,
    NgVarDirective,
    DateRangePickerComponent,
    BookPerTourComponent,
    TwelveHourFormatPipe,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    ToolboxListComponent,
    NumberOnlyDirective,
    TextOnlyDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    SlickCarouselModule,
    MatMenuModule,
    HttpClientModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel[environmentConfig.level],
    } as any),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgxDropzoneModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
  entryComponents: [ToolboxListComponent]
})
export class AppModule { }
