import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']

})
export class StatesComponent implements OnInit {

  public destinations!: any;
  public env = environment;

  constructor(private userService: UsersService, private toaster: ToastrService) { }

  ngOnInit() {
   this.getStatesList();
  }

  getStatesList(){
    this.userService.getAllStates().subscribe(res => {
      this.destinations = res.data;
      console.log(this.destinations)
    })
  }

  deleteItem(id:string) {
    this.userService.statesDelete(id).subscribe(res => {
      this.toaster.info(res)
      this.getStatesList();
      console.log(res)
    })
  }

}
