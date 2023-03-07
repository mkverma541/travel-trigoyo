
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { SingleBlogPostComponent } from './single-blog-post/single-blog-post.component';
import { TourPackagesComponent } from './tour-packages/tour-packages.component';
import { TourPackageDetailsComponent } from './tour-package-details/tour-package-details.component';
import { TourPackagesDestinationsComponent } from './tour-packages-destinations/tour-packages-destinations.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'blogs',
    component: BlogPostComponent
  },
  {
    path: 'blogs/:slug',
    component: SingleBlogPostComponent
  },
  // {
  //   path: 'blog/:id',
  //   component: SingleBlogPostComponent
  // },
   {
    path:'tour',
    children: [
      {
        path: '', redirectTo: 'packages', pathMatch: 'full'
      },
      {
        path: 'packages', component: TourPackagesComponent
      },
      {
        path: 'package/:slug', component: TourPackageDetailsComponent
      }
      // {
      //   path: 'packages/destinations/:id', component: TourPackagesDestinationsComponent 
      // },
    ]
  },
  // {
  //   path: 'blogs/category/:category',
  //   component: BlogsPostCategoriesComponent
  // },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'destinations',
    component: DestinationsComponent
  },
  {
    path: 'destinations/:id',
    component: TourPackagesDestinationsComponent
  },
  {
    path: 'india/state/:state',
    component: TourPackagesDestinationsComponent
  },
  {
    path: 'india/state/:state/:destination',
    component: TourPackagesDestinationsComponent
  }

  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
