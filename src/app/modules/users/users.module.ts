import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LayoutsModule } from 'src/app/core/layouts.module';
import { UsersRoutingModule } from './users-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LatestBlogPostComponent } from './widgets/latest-blog-post/latest-blog-post.component';
import { ContactComponent } from './contact/contact.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { PageNavComponent } from './page-nav/page-nav.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { SingleBlogPostComponent } from './single-blog-post/single-blog-post.component';
import { BlogsPostCategoriesComponent } from './blogs-post-categories/blogs-post-categories.component';
import { TourPackagesComponent } from './tour-packages/tour-packages.component';
import { TourPackageDetailsComponent } from './tour-package-details/tour-package-details.component';
import { SidewarWidgetComponent } from './sidewar-widget/sidewar-widget.component';
import { TourPackagesDestinationsComponent } from './tour-packages-destinations/tour-packages-destinations.component';

@NgModule({
    declarations: [
        HomeComponent,
        AboutUsComponent,
        LatestBlogPostComponent,
        ContactComponent,
        DestinationsComponent,
        PageNavComponent,
        BlogPostComponent,
        SingleBlogPostComponent,
        BlogsPostCategoriesComponent,
        TourPackagesComponent,
        TourPackageDetailsComponent,
        SidewarWidgetComponent,
        TourPackagesDestinationsComponent

    ],
    imports: [
        CommonModule,
        LayoutsModule,
        UsersRoutingModule,
        CarouselModule,
    ],
    providers: [],
})
export class UsersModule { }
