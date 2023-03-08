import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/core/services/helper.service';
import { UsersService } from 'src/app/core/services/users';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  contactForm!: FormGroup;
  constructor(private fb: FormBuilder, private userService: UsersService, private toaster: ToastrService, private helperService: HelperService,  private route: ActivatedRoute ) { }

  ngOnInit() {
    this.getMetaTags();
    this.initForm();
    this.userService.setCurrentPage('contact');
    this.getCurrentPage();
  }

  getMetaTags(){
    const url = this.route.snapshot.url;
    const pageName = url[0].path;
    console.log(pageName)

    this.userService.getMetaTags(pageName).subscribe(res => {
      let data = res.data;
      const title = data['title'];
      const description = data['description'];
      const keywords= data['keywords'];
      this.helperService.setPageSeo(title, description, keywords)
    })
  }


  getCurrentPage(){
    this.userService.getCurrentPage().subscribe(res => {
      console.log(res)
    })    
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
    })
  }

  


}
