import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './layouts/users/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './layouts/admin/admin-header/admin-header.component';
import { AdminFooterComponent } from './layouts/admin/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './layouts/admin/admin-sidebar/admin-sidebar.component';
import { UserFooterComponent } from './layouts/users/user-footer/user-footer.component';
import { UserHeaderComponent } from './layouts/users/user-header/user-header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  AuthLayoutComponent,
  AdminLayoutComponent,
  UserLayoutComponent,

  AdminHeaderComponent,
  AdminFooterComponent,
  AdminSidebarComponent,

  UserFooterComponent,
  UserHeaderComponent
]

const BASE_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...BASE_MODULES
  ],
  exports: [
    ...BASE_MODULES,
    ...COMPONENTS
  ]
})
export class LayoutsModule { }
