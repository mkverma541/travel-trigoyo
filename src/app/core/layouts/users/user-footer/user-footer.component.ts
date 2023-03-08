import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  private subscription = new Subscription;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getStateList();
    this.getTourPackageList();
    this.getAndamanTourPackage('Andaman and Nicobar Islands');

  }

  getStateList(){
   this.subscription = this.userService.topStateList().subscribe(res => {
      this.stateList = res.data;
      console.log(res, 'states')
    })
  }

  getTourPackageList(){
  this.subscription =  this.userService.top5TourPackageList().subscribe(res => {
      this.tourPackageArr = res.data;
      console.log(res, 'tour packages')
    })
  }

  getAndamanTourPackage(state:string){
  this.subscription =  this.userService.tourPackagesByState(state).subscribe(res => {
      this.andamanTourPackages = res.data;
      console.log(res, 'andman tour package')
    })
  }



}
