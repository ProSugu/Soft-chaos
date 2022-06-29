import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCardComponent } from './component/location-card/location-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SkeletonLoaderComponent } from './component/skeleton-loader/skeleton-loader.component';
import { MatRippleModule } from '@angular/material/core';

const MAT_MODULES = [
  MatProgressBarModule,
  MatRippleModule
];

@NgModule({
  declarations: [
    LocationCardComponent,
    SkeletonLoaderComponent
  ],
  imports: [
    CommonModule,
    MAT_MODULES
  ],
  exports: [
    LocationCardComponent,
    SkeletonLoaderComponent,
    MAT_MODULES
  ]
})
export class SharedModule { }
