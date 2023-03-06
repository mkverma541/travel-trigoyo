import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.css']
})
export class SeoComponent implements OnInit {

  public pages!: any;
  public env = environment;

  constructor(private userService: UsersService, private toaster: ToastrService) { }

  ngOnInit() {
    
   this.getList();
  }

  getList(){
    this.userService.metaTags().subscribe(res => {
      this.pages = res.data;
      console.log(this.pages)
    })
  }
  

  

}
