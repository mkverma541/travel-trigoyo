import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tour-facilities',
  templateUrl: './tour-facilities.component.html',
  styleUrls: ['./tour-facilities.component.css']
})
export class TourFacilitiesComponent implements OnInit {

  public facilities: any;
  public env = environment;
  addFacilityForm !: FormGroup;
  @ViewChild('closeModal', {static: true}) closeModal!:ElementRef;
  selectedFile: any;
  icon = null;

  constructor(private userService: UsersService, private toaster: ToastrService) { }

  ngOnInit() {
   this.getFacilities();
   this.initForm();
  }

  initForm(){
    this.addFacilityForm = new FormGroup({
      name: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    this.userService.tourFacilityCreate(this.addFacilityForm.value).subscribe(res => {
      this.toaster.success('Facility added successfully')
      this.closeModal.nativeElement.click();
      this.addFacilityForm.reset();
      this.getFacilities();
      console.log(res)
    })
  }

  getFacilities(){
    this.userService.tourFacilities().subscribe(res => {
      this.facilities = res.data;
      console.log(this.facilities)
    })
  }

  deleteItem(id:string) {
    this.userService.tourFacilityDelete(id).subscribe(data => {
      this.toaster.info(data)
      this.getFacilities();
    })
  }

  uploadIcon(event: any) {
    this.selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", this.selectedFile);
    console.log(formData)

    this.userService.uploadFiles(formData).subscribe(
      (res: any) => {
        console.log(res);
        let r = res.image[0];
        this.icon = r;
        console.log(r);
        if (r !== null) {
          this.addFacilityForm.patchValue({
            icon: r,
          });
        }
      }
    );
  }

}
