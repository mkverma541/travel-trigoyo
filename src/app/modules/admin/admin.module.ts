import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TourPackagesComponent } from './tour-packages/tour-packages.component';
import { BlogPostAddComponent } from './blog-post-add/blog-post-add.component';
import { LayoutsModule } from 'src/app/core/layouts.module';
import { BlogsComponent } from './blogs/blogs.component';
import { AddTourPackageComponent } from './add-tour-package/add-tour-package.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { DestinationsAddComponent } from './destinations-add/destinations-add.component';
import { BlogTagsComponent } from './blog-tags/blog-tags.component';
import { BlogCategoriesComponent } from './blog-categories/blog-categories.component';
import { AddBlogCategoriesComponent } from './blog-categories/add-blog-categories/add-blog-categories.component';
import { TourCategoriesComponent } from './tour-categories/tour-categories.component';
import { TourFacilitiesComponent } from './tour-facilities/tour-facilities.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ContactsComponent } from './contacts/contacts.component';
import { StatesComponent } from './states/states.component';
import { AddComponent } from './states/add/add.component';
import { SeoComponent } from './seo/seo.component';

import { QuillModule } from 'ngx-quill'


@NgModule({
  declarations: [
    DashboardComponent,
    TourPackagesComponent,
    BlogPostAddComponent,
    BlogsComponent,
    AddTourPackageComponent,
    DestinationsComponent,
    DestinationsAddComponent,
    BlogTagsComponent,
    BlogCategoriesComponent,
    AddBlogCategoriesComponent,
    TourCategoriesComponent,
    TourFacilitiesComponent,
    ContactsComponent,
    StatesComponent,
    AddComponent,
    SeoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutsModule,    
    QuillModule.forRoot(),

    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class AdminModule { }
