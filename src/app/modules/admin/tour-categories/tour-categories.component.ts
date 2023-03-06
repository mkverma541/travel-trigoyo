import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tour-categories',
  templateUrl: './tour-categories.component.html',
  styleUrls: ['./tour-categories.component.css']

})
export class TourCategoriesComponent implements OnInit {

  public categories: any;
  public env = environment;
  addCategoryForm !: FormGroup;
  @ViewChild('closeModal', {static: true}) closeModal!:ElementRef;

  constructor(private userService: UsersService, private toaster: ToastrService) { }

  ngOnInit() {
   this.getCategories();
   this.initForm();
  }

  initForm(){
    this.addCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  onSubmitCategory(){
    this.userService.tourCategoriesCreate(this.addCategoryForm.value).subscribe(res => {
      this.toaster.success('Category added successfully')
      this.closeModal.nativeElement.click();
      this.addCategoryForm.reset();
      this.getCategories();
      console.log(res)
    })
  }

  getCategories(){
    this.userService.tourCategoriesList().subscribe(res => {
      this.categories = res.data;
      console.log(this.categories)
    })
  }

  deleteItem(id:string) {
    this.userService.tourCategoriesDelete(id).subscribe(data => {
      this.toaster.info(data)
      this.getCategories();
    })
  }

}
