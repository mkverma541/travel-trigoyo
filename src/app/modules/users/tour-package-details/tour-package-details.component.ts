import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HelperService } from 'src/app/core/services/helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tour-package-details',
  templateUrl: './tour-package-details.component.html',
  styleUrls: ['./tour-package-details.component.css']
})
export class TourPackageDetailsComponent implements OnInit {
  
  env = environment;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    margin:10,
    navText: [ '<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>"' ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  
  packageDetails : any;
  private subscription = new Subscription;
  
  constructor(private activateRoute: ActivatedRoute, private userService: UsersService, private helperService: HelperService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(res => {
      let slug = res['slug'];
      console.log(slug)
      this.getPackageDetails(slug)
    })    
  }

  getPackageDetails(slug:string){
  this.subscription =  this.userService.tourPackagesDetailsBySlug(slug).subscribe(res => {
      this.packageDetails = res.data;
      let data = res.data;
      this.helperService.setPageSeo(data.seo?.title, data.seo?.description, data.seo?.keywords)
      console.log(this.packageDetails)
    })
  }

}
