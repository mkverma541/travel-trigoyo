import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/core/services/helper.service';
import { UsersService } from 'src/app/core/services/users';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private helperService: HelperService, private userService: UsersService,  private route: ActivatedRoute ){

  }

  ngOnInit(): void {
    this.getMetaTags();
  }

  getMetaTags(){
    const url = this.route.snapshot.url;
    const pageName = url[0].path;
    console.log(pageName)

    this.userService.getMetaTags(pageName).subscribe(res => {
      let data = res.data[0];
      const title = data['title'];
      const description = data['description'];
      const keywords= data['keywords'];
      this.helperService.setPageSeo(title, description, keywords)
    })
  }
  
  
}
