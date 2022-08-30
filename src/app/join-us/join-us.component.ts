import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MessagingService } from '../utils/services/messaging/messaging.service';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
export class JoinUsComponent {
  files: File[] = [];
  joinUsForm!: FormGroup;
  constructor(
    private titleService:Title,
    private fb: FormBuilder,
    private message: MessagingService
  ) {
    this.joinUsForm = fb.group({
      name: ['', [Validators.required]],
      titleAndRole: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      orgInd: ['', [Validators.required]],
      seekingRole: ['student', [Validators.required]],
      doc:[]
    });
  }
  ngOnInit(): void {
    this.titleService.setTitle("Soft Chaos-Careers")
}
  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  submit() {
    this.joinUsForm.markAllAsTouched();
    this.joinUsForm.markAsDirty();

    if(!this.files.length) {
      this.message.toast("error","Please upload atleast one file");
      return;
    }

    if(this.joinUsForm.valid) {
      this.message.toast("success","Form Submitted successfuly")
      console.log(this.joinUsForm.value);
      this.joinUsForm.reset()
    }
  }
}
