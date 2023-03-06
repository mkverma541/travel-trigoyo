import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {

  public destinations: any
  public env = environment;

  constructor(private userService: UsersService, private toaster: ToastrService) { }

  ngOnInit() {
   this.getTourDestinationList();
  }

  getTourDestinationList(){
    this.userService.tourDestinationsList().subscribe(res => {
      this.destinations = res.data;
      console.log(this.destinations)
    })
  }

  deleteItem(id:string) {
    this.userService.tourDestinationsDelete(id).subscribe(data => {
      this.toaster.success('Item deleted successfully')
      this.getTourDestinationList();
      console.log(data)
    })
  }

}
