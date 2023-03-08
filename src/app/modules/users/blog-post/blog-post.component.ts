import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/core/services/helper.service';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  meta = {
    title: 'Blog Page',
    description: 'Tour package page description',
    keywords: 'Khandar tour package'
  }
 
  postList!: any[];
  categories!: any[];
  env = environment;
  recentPosts : any;
  private subscription = new Subscription;

  constructor(private userService: UsersService, private route: ActivatedRoute, private helperService: HelperService ) { }

  ngOnInit() {
    this.getMetaTags();
    this.getBlogsList();
    this.getBlogsCategories();
    this.getRecentBlogList();
  }
  
  getMetaTags(){
    const url = this.route.snapshot.url;
    const pageName = url[0].path;
    console.log(pageName)

  this.subscription =  this.userService.getMetaTags(pageName).subscribe(res => {
    console.log(res, 'meta')
      let data = res.data;
      const title = data['title'];
      const description = data['description'];
      const keywords= data['keywords'];
      this.helperService.setPageSeo(title, description, keywords)
    })
  }


  getBlogsList(){
    this.subscription =  this.userService.blogPostsList().subscribe(res =>{
      this.postList = res.data;
      console.log(this.postList, 'post')
    })
  }

  getBlogsCategories(){
    this.subscription =  this.userService.blogCategoriesList().subscribe(res => {
      console.log(res.data, 'categories')
      this.categories = res.data;
    })
  }

  getRecentBlogList(){
    this.subscription = this.userService.recentBlogPosts().subscribe(res => {
      this.recentPosts = res.data;
      console.log(res, 'recent ')
    })
  }

}
