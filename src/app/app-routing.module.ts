import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
