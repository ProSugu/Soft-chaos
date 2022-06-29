import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  scrollPosition: number = 0;
  scrolled: boolean = false;
  @Input() isScrolled: boolean = false;
  @Input() headerList: any = [];

  constructor(public elmRef: ElementRef
  ) {
  }

  ngOnInit(): void {
  }

  onPathClick() {
    document.getElementById('collapse-btn')?.setAttribute('aria-expanded', 'false');
    document.getElementById('navbarSupportedContent')?.classList.remove('show');
  }

  onSubChildPathClick() {
    // document.getElementById('navbarSupportedContent')?.classList.remove('show');
  }

}
