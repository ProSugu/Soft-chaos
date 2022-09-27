import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCardComponent } from './component/location-card/location-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SkeletonLoaderComponent } from './component/skeleton-loader/skeleton-loader.component';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const MAT_MODULES = [
  MatProgressBarModule,
  MatRippleModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule
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
