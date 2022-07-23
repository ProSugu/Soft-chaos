import { Component, Input, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent {

  @Input() elementType = 'locationCard';
  @Input() anotherStructure?:any;
  constructor() { }

}
