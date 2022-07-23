import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPerScheduleComponent } from './book-per-schedule/book-per-schedule.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BookingComponent } from './booking/booking.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { JoinUsServiceComponent } from './join-us-service/join-us-service.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { ServiceComponent } from './service/service.component';
import { TourComponent } from './tour/tour.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookPerTourComponent } from './book-per-tour/bookpertour.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'book-per-tour',
    component: BookPerTourComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'book-per-schedule',
    component: BookPerScheduleComponent,
  },
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'tour',
    component: TourComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  },
  {
    path: 'destination',
    component: JoinUsComponent
  },
  {
    path: 'service',
    component: JoinUsServiceComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'service',
    component: ServiceComponent
  },
  {
    path: 'our-services',
    component: ServiceComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
