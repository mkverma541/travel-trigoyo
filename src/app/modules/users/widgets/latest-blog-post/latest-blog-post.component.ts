import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-latest-blog-post',
  templateUrl: './latest-blog-post.component.html',
  styleUrls: ['./latest-blog-post.component.css']
})
export class LatestBlogPostComponent implements OnInit {
  private subscription = new Subscription;
  blogPosts !: any[];
  env = environment;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getRecentBlogPost();
  }

  getRecentBlogPost(){
    this.subscription = this.userService.recentBlogPosts().subscribe(res => {
      this.blogPosts = res.data;
      console.log(this.blogPosts);
    })
  }

}

