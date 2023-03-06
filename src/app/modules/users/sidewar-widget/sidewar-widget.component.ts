import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users';

@Component({
  selector: 'app-sidewar-widget',
  templateUrl: './sidewar-widget.component.html',
  styleUrls: ['./sidewar-widget.component.css']
})
export class SidewarWidgetComponent implements OnInit {

  contactForm!: FormGroup;
  constructor(private fb: FormBuilder, private userService: UsersService, private toaster: ToastrService) { }

  ngOnInit() {
    this.initForm();
  }

  
  initForm(){
    this.contactForm = this.fb.group({
      name : ['', Validators.required],
      email : ['', Validators.required],
      phone : ['', Validators.required],
      subject : ['', Validators.required],
      message : ['']
    })
  }


  onSubmit(){
    this.userService.contactSend(this.contactForm.value).subscribe(res => {
      console.log(res)
      this.toaster.success('Message sent successfully');
      this.contactForm.reset();
    }, (err) => {
      this.toaster.error(err.message)
    })
  }

}


