import { Router } from '@angular/router';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/core/services/users';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})

export class UserHeaderComponent implements OnInit {
  contactForm!: FormGroup;
  @ViewChild('modal', {static: true}) modal!:ElementRef;
  isHeaderSticky = false;
  currentPage: string | undefined;

  @HostListener('window:scroll', ['$event']) onWindowScroll(e:any) {
    this.isHeaderSticky = window.pageYOffset > 150;
  }

  constructor(private fb: FormBuilder, private userService: UsersService, private toaster: ToastrService, private route: Router) { }

  ngOnInit() {
    this.initForm();
    this.getCurrentPage();
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

  
  getCurrentPage(){
    this.userService.getCurrentPage().subscribe(res => {
      this.currentPage = res;
      console.log(res)
    })    
  }


  navigateToPage(url:string) {
    this.route.navigate([url]);
  }


  onSubmit(){
    this.userService.contactSend(this.contactForm.value).subscribe(res => {
      console.log(res)
      this.toaster.success('Message sent successfully');
      this.modal.nativeElement.click();
      this.contactForm.reset();
    }, (err) => {
      this.toaster.error(err.message)
    })
  }

}
