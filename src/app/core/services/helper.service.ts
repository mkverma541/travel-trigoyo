import { Injectable } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

declare let gtag: Function; // declare the Google Analytics tracking function


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private title: Title, private meta: Meta) { }

  quillToolbar = {
    'toolbar': [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],

      ['link'],                         // link and image, video
   
    ]
  }

  setPageSeo(title:string, description:string, keywords:string){
      this.title.setTitle(title);   
      this.meta.updateTag({name: 'description', content: description});
      this.meta.updateTag({name: 'keywords', content: keywords});
  }

  





}
