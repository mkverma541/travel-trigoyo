import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/core/services/helper.service';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {

  destinations !: any[];
  states !: any[];
  public env = environment;
  showContent: boolean = false;
  constructor(private userService: UsersService, private route: ActivatedRoute, private helperService: HelperService) { }

  ngOnInit() {
    this.getMetaTags();
    this.getStates();
  }

  getMetaTags(){
    const url = this.route.snapshot.url;
    const pageName = url[0].path;
    console.log(pageName)

    this.userService.getMetaTags(pageName).subscribe(res => {
    let data = res.data;
      const title = data['title'];
      const description = data['description'];
      const keywords= data['keywords'];
      this.helperService.setPageSeo(title, description, keywords)
    })
  }

  // getTourDestinations(){
  //   this.userService.tourDestinationsList().subscribe(res => {
  //     this.destinations = res.data;
  //     console.log(this.destinations)
  //   })
  // }

  getStates(){
    this.userService.getAllStates().subscribe(res =>{
      this.states = res.data;
      console.log(res)
    })
  }

  toggleContent(){
    this.showContent = !this.showContent;
  }

}
