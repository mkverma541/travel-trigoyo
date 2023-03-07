import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/users/users.module').then(mod => mod.UsersModule)
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    redirectTo: '/' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'top'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
