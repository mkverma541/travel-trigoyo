
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']

})
export class AdminSidebarComponent implements OnInit {
  public activeRoute : any;

  constructor(private route: Router, private router: ActivatedRoute) { }

  ngOnInit() {
    this.route.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((res: any) => {
      let path = res.url;
      let arr = path.split("/");
      this.activeRoute = arr[arr.length - 1];
      console.log(this.activeRoute)
    });
  }

}
