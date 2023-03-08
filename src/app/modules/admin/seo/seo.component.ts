import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import {UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.css']
})
export class SeoComponent implements OnInit {

  public pages!: any;
  public env = environment;
  editMetaTagsForm!: FormGroup;
  editId!: string;
  pageName!: string;
  @ViewChild('closeModal', {static: true}) closeModal!: ElementRef;
  
  constructor(private userService: UsersService, private toaster: ToastrService, private fb: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
   this.getList();
    this.initForm();
  }

  getList(){
    this.adminService.metaTagsList().subscribe(res => {
      this.pages = res.data;
      console.log(this.pages)
    })
  }
  
  initForm(){
    this.editMetaTagsForm = this.fb.group({
      title: '',
      keywords: '',
      description: '',
    })
  }

  onUpdate(item:any){
    console.log(item)
    this.editMetaTagsForm.patchValue({
      title: item.title,
      keywords: item.keywords,
      description: item.description
    })
    this.editId = item._id;
    this.pageName = item.page;
  }


  onSubmit(){
    this.adminService.updateMetaTags(this.editMetaTagsForm.value,this.editId).subscribe(res=>{
      this.closeModal.nativeElement.click();
      this.getList();
      this.toaster.success(res.message)
    })
  }


}
