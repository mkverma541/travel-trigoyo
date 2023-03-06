import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blogs-post-categories',
  templateUrl: './blogs-post-categories.component.html',
  styleUrls: ['./blogs-post-categories.component.css']
})
export class BlogsPostCategoriesComponent implements OnInit {

  category !:any;
  articles!: any;
  env = environment;
  constructor(private userService: UsersService, private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    window.scroll(0,0)
    this.activatedRoute.params.subscribe(res => {
      this.category = res['category']
    })
    this.getArticlesList(this.category)
  }
  
  getArticlesList(category:string){
    this.userService.getArticlesCategory(category).subscribe(res => {
      this.articles = res.response;
      console.log(this.articles)
    })
  }

}
