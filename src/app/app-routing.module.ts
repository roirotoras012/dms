import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'manage-users',
    loadChildren: () => import('./admin/manage-users/manage-users.module').then( m => m.ManageUsersPageModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./admin/documents/documents.module').then( m => m.DocumentsPageModule)
  },
  {
    path: 'schedules',
    loadChildren: () => import('./admin/schedules/schedules.module').then( m => m.SchedulesPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'} ),
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
