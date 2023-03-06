
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {UsersService } from 'src/app/core/services/users';
import { HelperService } from 'src/app/core/services/helper.service';
import { environment } from 'src/environments/environment';
import {  IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-tour-package',
  templateUrl: './add-tour-package.component.html',
  styleUrls: ['./add-tour-package.component.css']
})
export class AddTourPackageComponent implements OnInit {

  categories: any; 
  addPackageForm!: FormGroup;
  featuredImage = null;
  fileType: any;
  selectedFile: any = null;
  env = environment;
  selectedFile2: any;
  galleryImages : any;
  destinations : any;
  isEdit = false;
  packageId !: string;
  numbers: number[] = [];
  facilities: any;
  selectedFacilities: string[] = [];
  dropdownList :any;
  selectedCategories: any[] = [];
  dropdownSettings = {};
  states :any;

  constructor(private userService: UsersService, 
            private router: Router, private toaster: ToastrService, 
            private fb: FormBuilder,
            private helperSrv : HelperService,
            private activateRoute : ActivatedRoute,
            ) { 
    for (let i = 1; i <= 30; i++) {
      this.numbers.push(i);
    }
  }

  modules = {}
  content = '';


  ngOnInit() {
    this.getPackageId();
    this.initForm();
    this.getAllStates();
    this.getTourCategories();
    this.getTourDestinations();
    this.getFacilities();
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }

  getPackageId(){
    this.activateRoute.params.subscribe(res => {
      let id = res['id'];
      console.log(id);
      if(id !== undefined) {
        this.isEdit = true;
        this.packageId = id;
        this.getPackageDetails(id)
      }
    })
  }

  getAllStates(){
    this.userService.getAllStates().subscribe(res => {
      this.states = res.data;
      console.log(this.states)
    })
  }


  initForm(){
    this.addPackageForm = this.fb.group({
      packageName: [null, Validators.required],
      price: [null, Validators.required],
      tourDays: [null, Validators.required],
      tourNights: [null, Validators.required],
      destination: [null, Validators.required],
      state: [null, Validators.required],
      facilities: [this.selectedFacilities, Validators.required],
      categories: [this.selectedCategories],
      description: [null],
      itinerary: this.fb.array([]),
      inclusions:  [null],
      exclusion:  [null],
      cancellationPolicy:  [null],
      importantNotes:  [null],
      featuredImage: [this.featuredImage],
      gallery: [this.galleryImages],
      extras: [null]
    })
  }


  createItem(): FormGroup {
    return this.fb.group({
      day: '',
      heading: '',
      overview: ''
    });
  }
  
  get itinerary():FormArray {
    return this.addPackageForm.get('itinerary') as FormArray;
  }

  addItem(): void {
    this.itinerary.push(this.createItem());
  }

  deleteItem(index: number) {
    console.log(index)
    const item = this.addPackageForm.get('itinerary') as FormArray;
    item.removeAt(index)
  }

  updateSelectedValues(e: any) {
    console.log(e)
    if(e.target.checked) {
      this.selectedFacilities.push(e.target.value)
    } else {
      const index = this.selectedFacilities.indexOf(e.target.value)
      if(index >=0) {
        this.selectedFacilities.splice(index, 1)
      }
    }
  }

  getPackageDetails(id:string){
    this.userService.tourPackagesDetails(id).subscribe(res => {
      let data = res.data;
      console.log(data, 'ss')
      this.addPackageForm.patchValue({
      packageName: data.packageName,
      price: data.price,
      tourDays: data.tourDays,
      tourNights: data.tourNights,
      destination: data.destination,
      categories: data.categories,
      description: data.description,
      itinerary: data.itinerary,
      inclusions: data.inclusions,
      exclusion:  data.exclusion,
      cancellationPolicy:  data.cancellationPolicy,
      importantNotes:  data.importantNotes,
      featuredImage: data.featuredImage,
      gallery: data.gallery,
      extras: data.extras 
      });
      this.featuredImage =  data.featuredImage;
      this.galleryImages = data.gallery;
      data.itinerary.forEach((element:any) => {
          this.itinerary.push(this.fb.group(element))
      });
    })
  }

  getFacilities(){
    this.userService.tourFacilities().subscribe(res => {
      this.facilities = res.data;
      console.log(this.facilities)
    })
  }


  onSubmit(){
    let payload = this.addPackageForm.value;
    let categories = this.selectedCategories.map((item => item._id));
    payload['categories'] = categories;
    console.log(payload);
    this.userService.tourPackagesCreate(payload).subscribe(res => {
      this.toaster.success('Package added successfully')
      this.router.navigate(['admin/tour-package'])
      console.log(res)
    })
  }
  
  onUpdate(){
    let payload = this.addPackageForm.value;
    console.log(this.addPackageForm.value)
    this.userService.tourPackagesUpdate(this.packageId, payload).subscribe(res => {
      this.toaster.success('Package update successfully')
      this.router.navigate(['admin/tour-package'])
      console.log(res)
    })
  }

  getTourCategories(){
    this.userService.tourCategoriesList().subscribe(res => {
      this.categories = res.data;
      console.log(this.categories)
    })
  }
  
  getTourDestinations(){
    this.userService.tourDestinationsList().subscribe(res => {
      this.destinations = res.data;
      console.log(this.destinations)
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
        if (r != null) {
          this.addPackageForm.patchValue({
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
          // this.addPackageForm.patchValue({
          //   featuredImage: r,
          // });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }




  
  




}
