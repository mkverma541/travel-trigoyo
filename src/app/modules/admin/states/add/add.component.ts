
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users';
import { HelperService } from 'src/app/core/services/helper.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']

})
export class AddComponent implements OnInit {

  categories: any; 
  addDestinationForm!: FormGroup;
  featuredImage = null;
  coverImage = null;
  fileType: any;
  selectedFile: any = null;
  selectedFile2: any = null;
  env = environment;
  editId!: string;
  isEdit: boolean = false;
  states = [];
  content !: any;


  constructor(private userService: UsersService, private router: Router, private toaster: ToastrService, private helperSrv: HelperService, private activatedRoute: ActivatedRoute) {
   
   }

   modules = {}
 
  ngOnInit() {
    this.initForm();
    this.getDestinationId();
  }

  

  getDestinationId(){
    this.activatedRoute.params.subscribe(res => {
      let id = res['id'];
      if(id != undefined) {
        this.editId = id;
        this.isEdit = true;
        this.getDestinationDetails(id)
      }
    })
  }

  getDestinationDetails(id:string) {
    this.userService.stateView(id).subscribe(res => {
      let data = res.data;
      this.addDestinationForm.patchValue({
        name: data.name,
        overview: data.overview,
        featuredImage: data.featuredImage,
        coverImage: data.coverImage
      })
      this.featuredImage = data.featuredImage,
      this.coverImage = data.coverImage
    })
  }


  initForm(){
    this.addDestinationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      overview: new FormControl(this.content),
      featuredImage: new FormControl(null, [Validators.required]),
      coverImage: new FormControl(null)
    })
  }

  onSubmit(){
    let payload = this.addDestinationForm.value;
    console.log(this.addDestinationForm.value)
    this.userService.statesAdd(payload).subscribe(res => {
      this.toaster.success('destination added successfully')
      this.router.navigate(['admin/destinations/states'])
      this.addDestinationForm.reset();
      console.log(res)
    })
  }

  deleteCoverImg(){
    this.coverImage = null;
  }
  deleteFeaturedImg(){
    this.featuredImage = null
  }

  onUpdate(){
    let payload = this.addDestinationForm.value;
    this.userService.stateUpdate(this.editId, payload).subscribe(res => {
      this.toaster.success(res);
      this.router.navigate(['/admin/destinations/states'])
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
        if (r != null) {
          this.addDestinationForm.patchValue({
            featuredImage: r,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  selectFile2(event: any) {
    this.selectedFile2 = event.target.files[0];
    const formData = new FormData();
    formData.append("image", this.selectedFile2);
    console.log(formData)

    this.userService.uploadFiles(formData).subscribe(
      (res: any) => {
        console.log(res);
        let r = res.image[0];
        this.coverImage = r;
        console.log(r);
        if (r != null) {
          this.addDestinationForm.patchValue({
            coverImage: r,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  




}
