import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication/auth.service';
import { UsersService } from './services/users/users.service';
import { AdminService } from './services/admin/admin.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';


const PROVIDERS =  [
  AuthenticationService,
  UsersService,
  AdminService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiPrefixInterceptor,
    multi: true
  }
]

const BASE_MODULES = [
  CommonModule,
  HttpClientModule
]

@NgModule({
  declarations: [],
  imports: [
    ...BASE_MODULES
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class CoreModule { }
