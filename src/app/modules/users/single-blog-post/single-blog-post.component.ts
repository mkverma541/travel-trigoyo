import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/core/services/helper.service';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-blog-post',
  templateUrl: './single-blog-post.component.html',
  styleUrls: ['./single-blog-post.component.css']
})

export class SingleBlogPostComponent implements OnInit, OnDestroy {

  blogId!: string;
  blogDetails : any;
  category!: 'Travel Guidlines';
  relatedPosts: any;
  env = environment;

  constructor(private userService: UsersService, private activateRoute : ActivatedRoute, private helperService: HelperService) { }
 
  ngOnInit() {
    this.activateRoute.params.subscribe(res => {
      console.log(res)
      const slug = res['slug'];
      if(slug !== undefined) {
        this.getBlogDetails(slug)
      }
    })
    this.getRelatedBlogList(this.category);
  }


  getBlogDetails(slug:string){
    this.userService.getBlogDetailsBySlug(slug).subscribe(res => {
      this.blogDetails = res.data;
      let data = res.data;
      this.helperService.setPageSeo(data.seo?.title, data.seo?.description, data.seo?.keywords)
      console.log(this.blogDetails)
    })
  }
  
  getRelatedBlogList(category:string){
      this.userService.getArticlesCategory(category).subscribe(res => {
      this.relatedPosts = res.response;
      console.log(this.relatedPosts)
    })
  }

  ngOnDestroy(): void {
   
  }



}
