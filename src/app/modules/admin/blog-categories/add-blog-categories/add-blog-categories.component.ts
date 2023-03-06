import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';
import { HelperService } from 'src/app/core/services/helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blog-categories',
  templateUrl: './add-blog-categories.component.html',
  styleUrls: ['./add-blog-categories.component.css']
})
export class AddBlogCategoriesComponent implements OnInit, OnDestroy {
  categories: any; 
  tags = [];
  addCategoryForm!: FormGroup;
  featuredImage = null;
  fileType: any;
  selectedFile: any = null;
  env = environment;
  selectedFile2: any;
  coverImg =  null;
  editId !: string;
  isEdit = false;
  blogDetails : any;
  private subscription = new Subscription;

  constructor(private userService: UsersService, private router: Router, private toaster: ToastrService, private helperSrv: HelperService, private activatedRoute: ActivatedRoute) {
  }
   
    modules = {}

    ngOnInit() {
    console.log(this.isEdit)
    this.getPostId();
    this.initForm();
    this.getBlogsCategories();
    this.getBlogsTags();
  }

  getPostId(){
    this.activatedRoute.params.subscribe(res => {
      let id = res['id'];
      console.log(id)
      if(id != undefined) {
        this.editId = id;
        this.isEdit = true;
        this.getCategoryDetails(id)
      }
    })
  }

  getCategoryDetails(id:string){
  this.subscription =  this.userService.blogPostDetails(id).subscribe(res => {
      let data = res.data;
      console.log(data)
      this.addCategoryForm.patchValue({
        name: data.name,
        desc: data.desc
      })
      this.featuredImage = data.image;
      this.coverImg = data.coverImage;
    })
  }

  initForm(){
    this.addCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      desc: new FormControl(null),
      image: new FormControl(null),
      coverImage: new FormControl(null)
    })
  }

  onSubmit(){
    let payload = this.addCategoryForm.value;
    console.log(this.addCategoryForm.value)
    this.userService.blogCategoriesCreate(payload).subscribe(res => {
      this.toaster.success('Category added successfully')
      this.router.navigate(['admin/blogs/categories'])
    })
  }

  onUpdate(){
    let payload = this.addCategoryForm.value;
    this.userService.blogPostUpdate(this.editId, payload).subscribe(res => {
      this.toaster.success('Blog Post update successfully')
      this.router.navigate(['admin/blogs/list'])
      console.log(res)
    })
  }
  
  getBlogsCategories(){
    this.subscription =  this.userService.blogCategoriesList().subscribe(res => {
      this.categories = res.data;
      console.log(this.categories)
    })
  }

  getBlogsTags(){
    this.subscription =  this.userService.blogTagsList().subscribe(res => {
      this.tags = res.data;
      console.log(this.categories)
    })
  }
  

  selectFile(event: any) {
    this.selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", this.selectedFile);
    console.log(formData)

    this.userService.uploadFiles(formData).subscribe(
      (res: any) => {
        console.log(res);
        let r = res.image[0];
        this.featuredImage = r;
        console.log(r);
        if (r !== null) {
          this.addCategoryForm.patchValue({
            image: r,
          });
        }
      }
    );
  }
  
  uploadCoverImage(event: any){
    console.log(event)
    this.selectedFile2 = event.target.files[0];
    console.log(this.selectedFile2)
    const formData = new FormData();
    formData.append("image", this.selectedFile2);
    console.log(formData)

    this.userService.uploadFiles(formData).subscribe(
      (res: any) => {
        console.log(res);
        let r = res.image[0];
        this.coverImg = r;
        if (r != null) {
          this.addCategoryForm.patchValue({
            coverImge: r,
          });
        }
      }
    );
  }

  deleteFeaturedImg(){
    this.featuredImage = null;
  }

  deleteCoverImg(){
      this.coverImg = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
