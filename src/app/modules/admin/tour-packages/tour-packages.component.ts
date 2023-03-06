import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tour-packages',
  templateUrl: './tour-packages.component.html',
  styleUrls: ['./tour-packages.component.css']
})
export class TourPackagesComponent implements OnInit {

  public packageList : any;
  public env = environment;

  constructor(private userService: UsersService, private  toaster: ToastrService) { }
  
  ngOnInit() {
    this.getPackageList();
  }

  getPackageList(){
    this.userService.tourPackagesList().subscribe(res => {
      this.packageList = res.data;
      console.log(this.packageList)
    })
  }

  deletePackage(id:string){
    this.userService.tourPackagesDelete(id).subscribe(res => {
      this.toaster.info(res)
      this.getPackageList();
    })
  }

}
