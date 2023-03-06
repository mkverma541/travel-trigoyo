
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  private currentPage = new BehaviorSubject<string>('home');

  getCurrentPage(){
    return this.currentPage.asObservable();
  }
  
  setCurrentPage(pageName: string) {
    this.currentPage.next(pageName);
  }

  uploadFiles(data:any): Observable<any> {
    const href = `${environment.fileUpload}`;
    return this.http.post<any>(href, data).pipe(
      map((data: any) => {
        if (data.status == "success") {
          return data.response;
        }
      })
    );
  }

  // Post 
  blogPostsList(): Observable<any> {
    const href = `${environment.blogsPosts}`;
    return this.http.get<any>(href).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  recentBlogPosts(): Observable<any> {
    const href = `${environment.blogsRecent}`;
    return this.http.get<any>(href).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  blogPostCreate(payload:any): Observable<any> {
    const href = `${environment.blogsPosts}`;
    return this.http.post<any>(href, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data;
        }
      })
    );
  }

  blogPostUpdate(id:string, payload:string): Observable<any> {
    const href = `${environment.blogsPosts}`;
    return this.http.patch<any>(href + '/' + id, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data;
        }
      })
    );
  }

  blogPostDelete(id:string): Observable<any> {
    const href = `${environment.blogsPosts}`;
    return this.http.delete<any>(href + '/' + id).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data;
        }
      })
    );
  }

  blogPostDetails(id:string): Observable<any> {
    const href = `${environment.blogsPosts}`;
    return this.http.get<any>(href + '/' + id).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  getBlogDetailsBySlug(slug:string): Observable<any> {
    const href = `${environment.blogPost}`;
    return this.http.get<any>(href + '/' + slug).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  // Blogs Caetgories

  blogCategoriesList(): Observable<any> {
    const href = `${environment.blogsCategories}`;
    return this.http.get<any>(href).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  blogCategoriesCreate(payload:any): Observable<any> {
    const href = `${environment.blogsCategories}`;
    return this.http.post<any>(href, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  blogCategoriesUpdate(id:string, payload:any): Observable<any> {
    const href = `${environment.blogsCategories}`;
    return this.http.patch<any>(href + '/' + id, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data;
        }
      })
    );
  }

  blogCategoriesDelete(id:string): Observable<any> {
    const href = `${environment.blogsCategories}`;
    return this.http.delete<any>(href + '/' + id).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  // Tags

  blogTagsList(): Observable<any> {
    const href = `${environment.blogsTags}`;
    return this.http.get<any>(href).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  blogTagsCreate(payload:any): Observable<any> {
    const href = `${environment.blogsTags}`;
    return this.http.post<any>(href, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data;
        }
      })
    );
  }

  blogTagsUpdate(id:string, payload:any): Observable<any> {
    const href = `${environment.blogsTags}`;
    return this.http.patch<any>(href + '/' + id, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data;
        }
      })
    );
  }

  blogTagsDelete(id:string): Observable<any> {
    const href = `${environment.blogsTags}`;
    return this.http.delete<any>(href + '/' + id).pipe(
      map((data: any) => {
        console.log(data)
        if (data.status === "success") {
          return data;
        }
      })
    );
  }

  // Tour Packages

  tourPackagesList(): Observable<any> {
    const href = `${environment.tourPackage}`;
    return this.http.get<any>(href).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  tourPackagesCreate(payload:any): Observable<any> {
    const href = `${environment.tourPackage}`;
    return this.http.post<any>(href, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data;
        }
      })
    );
  }

  tourPackagesUpdate(id:string, payload:any): Observable<any> {
    const href = `${environment.tourPackage}`;
    return this.http.patch<any>(href + '/' + id, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data;
        }
      })
    );
  }

  tourPackagesDelete(id:string): Observable<any> {
    const href = `${environment.tourPackage}`;
    return this.http.delete<any>(href + '/' + id).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  tourPackagesDetails(id:string): Observable<any> {
    const href = `${environment.tourPackage}`;
    return this.http.get<any>(href + '/' + id).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  // Tour Destinations

  tourDestinationsList(): Observable<any> {
    const href = `${environment.tourDestinations}`;
    return this.http.get<any>(href).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  tourDestinationsCreate(payload:any): Observable<any> {
    const href = `${environment.tourDestinations}`;
    return this.http.post<any>(href, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data;
        }
      })
    );
  }

  tourDestinationsUpdate(id:string, payload:any): Observable<any> {
    const href = `${environment.tourDestinations}`;
    return this.http.patch<any>(href + '/' + id, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data;
        }
      })
    );
  }

  tourDestinationsDetails(id:string): Observable<any> {
    const href = `${environment.tourDestinations}`;
    return this.http.get<any>(href + '/' + id).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  destinationsDetailsByName(name:string): Observable<any> {
    const href = `${environment.tourDestinationDetails}`;
    return this.http.get<any>(href  + name).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }


  tourDestinationsDelete(id:string): Observable<any> {
    const href = `${environment.tourDestinations}`;
    return this.http.delete<any>(href + '/' + id).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data;
        }
      })
    );
  }


// Tour Categories

tourCategoriesList(): Observable<any> {
  const href = `${environment.tourCategories}`;
  return this.http.get<any>(href).pipe(
    map((data: any) => {
      if (data.status === "success") {
        return data.data;
      }
    })
  );
}

tourCategoriesCreate(payload:any): Observable<any> {
  const href = `${environment.tourCategories}`;
  return this.http.post<any>(href, payload).pipe(
    map((data: any) => {
      if (data.status === "success") {
        return data;
      }
    })
  );
}

tourCategoriesUpdate(id:string, payload:any): Observable<any> {
  const href = `${environment.tourCategories}`;
  return this.http.patch<any>(href + '/' + id, payload).pipe(
    map((data: any) => {
      if (data.status === "success") {
        return data;
      }
    })
  );
}

tourCategoriesDelete(id:string): Observable<any> {
  const href = `${environment.tourCategories}`;
  return this.http.delete<any>(href + '/' + id).pipe(
    map((data: any) => {
      if (data.status === "success") {
        return data.data;
      }
    })
  );
}

/* -- */


  getArticlesCategory(category:string): Observable<any> {
    const href = `${environment.blogsCategory}`;
    return this.http.get<any>(href + category).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data;
        }
      })
    );
  }


  tourPackagesByState(state:string): Observable<any> {
    const href = `${environment.tourPackageByState}`;
    return this.http.get<any>(href + state).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  tourPackagesByDestination(destination:string): Observable<any> {
    const href = `${environment.tourPackageByDestination}`;
    return this.http.get<any>(href + destination).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  tourFacilities(): Observable<any> {
    const href = `${environment.tourFacilities}`;
    return this.http.get<any>(href).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  tourFacilityCreate(payload:any): Observable<any> {
    const href = `${environment.tourFacilities}`;
    return this.http.post<any>(href, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  tourFacilityDelete(id:any): Observable<any> {
    const href = `${environment.tourFacilities}`;
    return this.http.delete<any>(href + '/' + id).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  contactList(): Observable<any> {
    const href = `${environment.contact}`;
    return this.http.get<any>(href).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  contactSend(payload:any): Observable<any> {
    const href = `${environment.contact}`;
    return this.http.post<any>(href, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }


  getAllStates(): Observable<any>{
    const href = `${environment.states}`;
    return this.http.get<any>(href).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }
 
  statesAdd(payload:any): Observable<any>{
    const href = `${environment.states}`;
    return this.http.post<any>(href, payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }
  
  statesDelete(id:string): Observable<any>{
    const href = `${environment.states}`;
    return this.http.delete<any>(href + '/' + id).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    );
  }

  getDestinationsWithStates(state:string): Observable<any>{
    const href = `${environment.destinationsState}`;
    return this.http.get<any>(href + state).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    ); 
  }
  
  stateView(state:string): Observable<any>{
    const href = `${environment.states}`;
    return this.http.get<any>(href + '/' + state).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    ); 
  }

  stateUpdate(id:string,payload:any): Observable<any>{
    const href = `${environment.states}`;
    return this.http.patch<any>(href + '/' + id,  payload).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    ); 
  }

  statesDetailsByName(state:string): Observable<any>{
    const href = `${environment.stateDetails}`;
    return this.http.get<any>(href  + state).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    ); 
  }

  topStateList(): Observable<any>{
    const href = `${environment.topStateList}`;
    return this.http.get<any>(href).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    ); 
  }

  
  topTourPackageList(): Observable<any>{
    const href = `${environment.topPackageList}`;
    return this.http.get<any>(href).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    ); 
  }


  metaTags(): Observable<any>{
    const href = `${environment.pageMetaTags}`;
    return this.http.get<any>(href).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    ); 
  }


  getMetaTags(page:string): Observable<any>{
    const href = `${environment.pageMetaTags}`;
    return this.http.get<any>(`${href}/${page}`).pipe(
      map((data: any) => {
        if (data.status === "success") {
          return data.data;
        }
      })
    ); 
  }



}

