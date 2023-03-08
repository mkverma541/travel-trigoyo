import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(    private http: HttpClient,
    ) { }


    updateMetaTags(data:any, id:string): Observable<any>{
      const href = `${environment.metaTagsList}/${id}`;
      return this.http.patch<any>(href, data).pipe(
        map((data: any) => {
          if (data.status === "success") {
            return data.data;
          }
        })
      ); 
    }


    metaTagsList(): Observable<any>{
      const href = `${environment.metaTagsList}`;
      return this.http.get<any>(href).pipe(
        map((data: any) => {
          if (data.status === "success") {
            return data.data;
          }
        })
      ); 
    }

    


}
