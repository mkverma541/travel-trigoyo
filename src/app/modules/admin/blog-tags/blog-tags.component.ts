import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-tags',
  templateUrl: './blog-tags.component.html',
  styleUrls: ['./blog-tags.component.css']

})
export class BlogTagsComponent implements OnInit {

  public tags!: any[];
  public env = environment;
  addTagForm !: FormGroup;
  @ViewChild('closeModal', {static: true}) closeModal!:ElementRef;

  constructor(private userService: UsersService, private toaster: ToastrService) { }

  ngOnInit() {
   this.getTags();
   this.initForm();
  }

  initForm(){
    this.addTagForm = new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  onSubmitTag(){
    this.userService.blogTagsCreate(this.addTagForm.value).subscribe(res => {
      this.toaster.success('Tag added successfully')
      this.closeModal.nativeElement.click();
      this.addTagForm.reset();
      this.getTags();
      console.log(res)
    })
  }

  getTags(){
    this.userService.blogTagsList().subscribe(res => {
      this.tags = res.data;
      console.log(this.tags)
    })
  }

  deleteItem(id:string) {
    this.userService.blogTagsDelete(id).subscribe(data => {
      this.toaster.info('Item deleted successfully')
      this.getTags();
    })
  }

}
