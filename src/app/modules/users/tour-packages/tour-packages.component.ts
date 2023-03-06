import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/core/services/helper.service';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-tour-packages',
  templateUrl: './tour-packages.component.html',
  styleUrls: ['./tour-packages.component.css']
})
export class TourPackagesComponent implements OnInit {
  meta = {
    title: 'Tour Packages',
    description: 'Tour package page description',
    keywords: 'Khandar tour package'
  }
  packageList!: any[];
  // destinations: [];
  tourCategories!: [];
  env = environment;

  contactForm!: FormGroup;
  @ViewChild('modal', {static: true}) modal!:ElementRef;


  constructor(
              private userService: UsersService, 
              private toaster: ToastrService, 
              private fb: FormBuilder, 
              private helperService: HelperService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.getMetaTags();
    this.getPackageList();
    // this.getTourDestinations();
    // this.getTourCategories();
    this.initForm();
  }

  getMetaTags(){
    const url = this.route.snapshot.url;
    const pageName = url[0].path;
    console.log(pageName)

    this.userService.getMetaTags(pageName).subscribe(res => {
      let data = res.data[0];
      const title = data['title'];
      const description = data['description'];
      const keywords= data['keywords'];
      this.helperService.setPageSeo(title, description, keywords)
    })
  }

  getPackageList(){
    this.userService.tourPackagesList().subscribe(res => {
      this.packageList = res.data;
      console.log(this.packageList)
    })
  }

  // getTourDestinations(){
  //   this.userService.tourDestinationsList().subscribe(res => {
  //     this.destinations = res.data;
  //     console.log(this.destinations)
  //   })
  // }

  // getTourCategories(){
  //   this.userService.tourCategoriesList().subscribe(res => {
  //     this.tourCategories = res.data;
  //     console.log(this.tourCategories, 'category')
  //   })
  // }

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
  

  initForm(){
    this.contactForm = this.fb.group({
      name : ['', Validators.required],
      email : ['', Validators.required],
      phone : ['', Validators.required],
      subject : ['', Validators.required],
      message : ['']
    })
  }
}
