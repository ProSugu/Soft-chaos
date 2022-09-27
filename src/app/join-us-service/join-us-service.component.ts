import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Api } from '../utils/apis';
import { HttpService } from '../utils/services/http/http.service';
import { MessagingService } from '../utils/services/messaging/messaging.service';

@Component({
  selector: 'app-join-us-service',
  templateUrl: './join-us-service.component.html',
  styleUrls: ['./join-us-service.component.scss']
})
export class JoinUsServiceComponent implements OnInit {
  files: File[] = [];
  joinUsForm!: FormGroup;
  fileSubmitted: boolean = false;

  constructor(
    private titleService:Title,
    private fb: FormBuilder,
    private message: MessagingService,
    private httpService : HttpService
  ) {
    this.joinUsForm = this.fb.group({
      name: ['', [Validators.required]],
      title: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile_number:['', [Validators.required]],
      organization_industry: ['', [Validators.required]],
      location: ['', [Validators.required]],
      service_provided: ['', [Validators.required]],
      document:[, [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.titleService.setTitle("soft chaos-Promote-service")
  }

  onSelect(event:any) {
    this.fileSubmitted = true;

    this.files = [];
    if((event.addedFiles[0].size/ 1000000) <= 5) {
    this.files.push(...event.addedFiles);
    this.httpService.uploadFile(Api.uploadFile,{files:this.files[0]}).subscribe((res:any) => {
      this.joinUsForm.patchValue({document:JSON.stringify(res[0].id)})
    });
  }else {
    this.message.toast('warning', 'file size should not exceed more than 5MB');
  }
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  submit() {
    this.fileSubmitted = true;

    this.joinUsForm.markAllAsTouched();
    this.joinUsForm.markAsDirty();

    if(!this.files.length) {
      this.message.toast("error","Please upload atleast one file");
      return;
    }

    if(this.joinUsForm.valid) {
      this.httpService.postData(Api.promoteYourServices,{data:{...this.joinUsForm.value}}).subscribe(res=> {
        this.message.toast("success","Form Submitted successfuly")
        this.joinUsForm.reset();
        this.files = [];
      },
      err => {
        console.log(err);
      })
    }
  }

}
