
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
  
  meta = {
    title: 'Home',
    description: 'Home page description',
    keywords: 'Chardham tour package'
  }

  private subscription = new Subscription;

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
    this.userService.setCurrentPage('home');
    this.getCurrentPage();
    this.getAndamanTourPackage('Andaman and Nicobar Islands');
  }

  getMetaTags(){
    const url = this.route.snapshot.url;
    const pageName = url[0].path;

    this.userService.getMetaTags(pageName).subscribe(res => {
      let data = res.data[0];
      const title = data['title'];
      const description = data['description'];
      const keywords= data['keywords'];
      this.helperService.setPageSeo(title, description, keywords)
    })
  }
  
  getCurrentPage(){
    this.userService.getCurrentPage().subscribe(res => {
      console.log(res)
    })    
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


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
