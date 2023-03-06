import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';
import { HelperService } from 'src/app/core/services/helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-post-add',
  templateUrl: './blog-post-add.component.html',
  styleUrls: ['./blog-post-add.component.css']
})
export class BlogPostAddComponent implements OnInit, OnDestroy {
  categories: any; 
  tags : any;
  addPostForm!: FormGroup;
  featuredImage = null;
  fileType: any;
  selectedFile :any;
  env = environment;
  selectedFile2: any;
  galleryImages : any = [];
  editId : any;
  isEdit = false;
  blogDetails : any;
  private subscription = new Subscription;

  constructor(private userService: UsersService, private router: Router, private toaster: ToastrService, private helperSrv: HelperService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    
  }
   
    modules = {}

    ngOnInit() {
    console.log(this.isEdit)
    this.getPostId();
    this.initForm();
    this.setSlug();
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
        this.getBlogDetails(id)
      }
    })
  }

  getBlogDetails(id:string){
  this.subscription =  this.userService.blogPostDetails(id).subscribe(res => {
      let data = res.data;
      console.log(data)
      this.addPostForm.patchValue({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category._id,
        tags: data.tags._id,
        featuredImage: data.featuredImage,
        gallery: this.galleryImages
      })
      this.featuredImage = data.featuredImage;
      this.galleryImages = data.gallery;
      
    })
  }

  initForm(){
    this.addPostForm = this.fb.group({
      title: ['', Validators.required],
      excerpt: '',
      content: ['', Validators.required],
      category: '',
      tags: '',
      featuredImage: [''],
      gallery: [this.galleryImages],
      seo: this.fb.group({
        title: '',
        description:'',
        keywords: '' 
      }),
      slug: ''
    })
  }

  setSlug(){
    console.log(this.addPostForm.controls)
      this.addPostForm.controls['title'].valueChanges.subscribe((value:string) => {
        this.addPostForm.controls['slug'].setValue(this.createSlug(value))
        this.addPostForm.get('seo.title')?.setValue(value);
        console.log(this.addPostForm.controls)
      })
  }

  createSlug(title: string):string{
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    slug = slug.replace(/^-|-$/g, ''); 
    return slug;
  }

  onSubmit(){
    let payload = this.addPostForm.value;
    debugger
    console.log(this.addPostForm.value)
    this.userService.blogPostCreate(payload).subscribe(res => {
      this.toaster.success('Blog Post added successfully')
      this.router.navigate(['admin/blogs/list'])
      console.log(res)
    })
  }

  onUpdate(){
    let payload = this.addPostForm.value;
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
    formData.append("documents", this.selectedFile);
    console.log(formData)

    this.userService.uploadFiles(formData).subscribe(
      (res: any) => {
        console.log(res);
        let r = res.documents[0];
        this.featuredImage = r;
        console.log(r);
        if (r != null) {
          this.addPostForm.patchValue({
            featuredImage: r,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  uploadGalleryImage(event: any){
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
        this.galleryImages.push(r);
        console.log(this.galleryImages)
        console.log(r);
        if (r != null) {
          this.addPostForm.patchValue({
            gallery: r,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteFeaturedImg(){
    this.featuredImage = null;
  }
  deleteGalleyImg(index:number){
      console.log(index)
      this.galleryImages.splice(index,1 )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
