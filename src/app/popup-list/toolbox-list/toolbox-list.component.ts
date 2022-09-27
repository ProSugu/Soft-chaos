import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbox-list',
  templateUrl: './toolbox-list.component.html',
  styleUrls: ['./toolbox-list.component.scss']
})
export class ToolboxListComponent implements OnInit {

  public toolboxList: any[] = [];

  constructor(public dialogRef: MatDialogRef<ToolboxListComponent>,
    @Inject(MAT_DIALOG_DATA) data: any[]) {
    this.toolboxList = data;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
