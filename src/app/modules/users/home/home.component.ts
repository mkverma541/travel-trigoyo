
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/core/services/helper.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  destinations!: any[];
  tourPackages !: any[];
  env = environment;
  andamanTourPackages !: any[];
  AndamanDestination = 'Andaman';
  stateList !:any[];
  tourPackageArr !:any[];
  private subscription  = new Subscription;
  
  meta = {
    title: 'Home',
    description: 'Home page description',
    keywords: 'Chardham tour package'
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    margin:30,
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
        items: 5
      }
    },
    nav: true
  }

  constructor(private userService: UsersService, private helperService: HelperService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMetaTags();
    this.getStateList();
    this.getTourPackageList();
    this.getAndamanTourPackage('Andaman and Nicobar Islands');
  }

  getMetaTags(){
    const url = this.route.snapshot.url;
    const pageName = url[0].path;
    console.log(pageName)
    this.userService.setCurrentPage(pageName);
    
    this.subscription= this.userService.getMetaTags(pageName).subscribe(res => {
      console.log(res)
      let data = res.data;
      console.log(data, 'meta')
      const title = data['title'];
      const description = data['description'];
      const keywords= data['keywords'];
      this.helperService.setPageSeo(title, description, keywords)
    })
  }
  
  getStateList(){
  this.subscription = this.userService.topStateList().subscribe(res => {
      this.stateList = res.data;
      console.log(res, 'states')
    })
  }

  getTourPackageList(){
    this.subscription = this.userService.top5TourPackageList().subscribe(res => {
      this.tourPackageArr = res.data;
      console.log(res, 'packages')
    })
  }

  getAndamanTourPackage(state:string){
    this.subscription = this.userService.tourPackagesByState(state).subscribe(res => {
      this.andamanTourPackages = res.data;
      console.log(res, 'andaman package')
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
