import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagingService } from '../utils/services/messaging/messaging.service';

@Component({
  selector: 'app-join-us-service',
  templateUrl: './join-us-service.component.html',
  styleUrls: ['./join-us-service.component.scss']
})
export class JoinUsServiceComponent {
  files: File[] = [];
  joinUsForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private message: MessagingService
  ) {
    this.joinUsForm = fb.group({
      name: ['', [Validators.required]],
      titleAndRole: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone:['', [Validators.required]],
      orgInd: ['', [Validators.required]],
      loc: ['', [Validators.required]],
      servicesProvided: ['', [Validators.required]],
      doc:[]
    });
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
      console.log(this.joinUsForm);
      this.joinUsForm.reset();
    }
  }

}
