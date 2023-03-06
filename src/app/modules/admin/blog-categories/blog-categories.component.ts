import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html',
  styleUrls: ['./blog-categories.component.css']
})
export class BlogCategoriesComponent implements OnInit {

  public categories: any;
  public env = environment;
  @ViewChild('closeModal', {static: true}) closeModal:ElementRef | undefined;

  constructor(private userService: UsersService, private toaster: ToastrService) { }

  ngOnInit() {
   this.getBlogsCategories();
  }


  getBlogsCategories(){
    this.userService.blogCategoriesList().subscribe(res => {
      this.categories = res.data;
      console.log(this.categories)
    })
  }

  deleteItem(id:string) {
    this.userService.blogCategoriesDelete(id).subscribe(data => {
      this.toaster.info(data)
      this.getBlogsCategories();
    })
  }

}
