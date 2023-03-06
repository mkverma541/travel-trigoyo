import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TourPackagesComponent } from './tour-packages/tour-packages.component';
import { BlogPostAddComponent } from './blog-post-add/blog-post-add.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AddTourPackageComponent } from './add-tour-package/add-tour-package.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { DestinationsAddComponent } from './destinations-add/destinations-add.component';
import { BlogTagsComponent } from './blog-tags/blog-tags.component';
import { BlogCategoriesComponent } from './blog-categories/blog-categories.component';
import { AddBlogCategoriesComponent } from './blog-categories/add-blog-categories/add-blog-categories.component';
import { TourCategoriesComponent } from './tour-categories/tour-categories.component';
import { TourFacilitiesComponent } from './tour-facilities/tour-facilities.component';
import { ContactsComponent } from './contacts/contacts.component';
import { StatesComponent } from './states/states.component';
import { AddComponent } from './states/add/add.component';
import { SeoComponent } from './seo/seo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'tour-package',
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full' },
      {path: 'list', component: TourPackagesComponent},
      {path: 'add', component: AddTourPackageComponent},
      {path: 'edit/:id', component: AddTourPackageComponent},
    ]
  },
  {
    path: 'blogs',
    children:[
      { path: '', redirectTo:'list', pathMatch: 'full'},
      { path: 'list', component: BlogsComponent },
      { path: 'add', component: BlogPostAddComponent },
      { path: 'edit/:id', component: BlogPostAddComponent },
      { path: 'tags', component: BlogTagsComponent},
      { path: 'categories',
        children: [
           { path: '', redirectTo: 'list', pathMatch: 'full'},
           { path: 'list',component: BlogCategoriesComponent},
           { path: 'add',component: AddBlogCategoriesComponent},
           { path: 'edit/:id', component: AddBlogCategoriesComponent}
        ]
      }
    ],
  },
  {
    path: 'destinations', children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: DestinationsComponent},
      {path: 'add', component: DestinationsAddComponent},
      { path: 'edit/:id', component: DestinationsAddComponent},
      { path: 'states',
        children: [
          {path: '', redirectTo: 'list', pathMatch: 'full' },
          {path: 'list', component: StatesComponent },
          {path: 'add', component: AddComponent },
          {path: 'edit/:id', component: AddComponent },
        ]
      }
    ]
  },
  {
    path: 'tour-categories', children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: TourCategoriesComponent}
    ]
  },
  {
    path: 'tour-facilities', component: TourFacilitiesComponent
  },
  {
    path: 'contact', component: ContactsComponent
  },
  {
    path: 'seo', component: SeoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  static component = [
    DashboardComponent,
  ]
 }
