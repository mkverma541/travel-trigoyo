import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogPosts : any;
  env = environment;

  constructor(private userService: UsersService, private toaster: ToastrService) { }

  ngOnInit() {
    this.getBlogList();
    
  }

  getBlogList(){
    this.userService.blogPostsList().subscribe(res => {
      this.blogPosts = res.data;
      console.log(this.blogPosts)
    })
  }

  deletePost(id:string) {
    this.userService.blogPostDelete(id).subscribe(res => {
      this.toaster.info('Post deleted successfully')
      this.getBlogList();
    })
  }

}
