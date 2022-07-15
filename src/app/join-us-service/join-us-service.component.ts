import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-us-service',
  templateUrl: './join-us-service.component.html',
  styleUrls: ['./join-us-service.component.scss']
})
export class JoinUsServiceComponent implements OnInit {
  files: File[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
