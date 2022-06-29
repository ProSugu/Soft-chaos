import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { BookingComponent } from './booking/booking.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { ServiceComponent } from './service/service.component';
import { TourComponent } from './tour/tour.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
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
    path: 'join-us',
    component: JoinUsComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'service',
    component: ServiceComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
