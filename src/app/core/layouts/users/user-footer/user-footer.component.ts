import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.css']

})
export class UserFooterComponent implements OnInit {

  stateList : any[] = [];
  tourPackageArr : any[] = [];
  andamanTourPackages= [];

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getStateList();
    this.getTourPackageList();
    this.getAndamanTourPackage('Andaman and Nicobar Islands');

  }

  getStateList(){
    this.userService.topStateList().subscribe(res => {
      this.stateList = res.data;
      console.log(res)
    })
  }

  getTourPackageList(){
    this.userService.topTourPackageList().subscribe(res => {
      this.tourPackageArr = res.data;
      console.log(res)
    })
  }

  getAndamanTourPackage(state:string){
    this.userService.tourPackagesByState(state).subscribe(res => {
      this.andamanTourPackages = res.data;
      console.log(res, 'aa')
    })
  }



}
