import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private userService: UsersService, private route: ActivatedRoute, private helperService: HelperService ) { }

  ngOnInit() {
    this.getMetaTags();
    this.getBlogsList();
    this.getBlogsCategories();
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


  getBlogsList(){
    this.userService.blogPostsList().subscribe(res =>{
      this.postList = res.data;
      console.log(this.postList)
    })
  }

  getBlogsCategories(){
    this.userService.blogCategoriesList().subscribe(res => {
      console.log(res.data)
      this.categories = res.data;
      console.log(this.categories)
    })
  }

}
