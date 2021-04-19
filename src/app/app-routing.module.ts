import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard } from './services/admin-guard.guard';
import { AudtiorGuardGuard } from './services/audtior-guard.guard';
import { AuthGuardService } from './services/auth-guard.service';
import { DepartmentalGuardGuard } from './services/departmental-guard.guard';
import { LoginGuardGuard } from './services/login-guard.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [LoginGuardGuard],
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    canActivate: [AuthGuardService, AdminGuardGuard],
    loadChildren: () => import('./members/member-routing.module').then( m => m.MemberRoutingModule)
  },
  {
    path: '',
    canActivate: [DepartmentalGuardGuard,AuthGuardService],
    loadChildren: () => import('./members/departmental-routing.module').then( m => m.DepartmentalRoutingModule)
  },
  {
    path: '',
    canActivate: [AudtiorGuardGuard,AuthGuardService],
    loadChildren: () => import('./members/auditor-routing.module').then( m => m.AuditorRoutingModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },  {
    path: 'add-branch',
    loadChildren: () => import('./components/add-branch/add-branch.module').then( m => m.AddBranchPageModule)
  },
  {
    path: 'view-branch',
    loadChildren: () => import('./components/view-branch/view-branch.module').then( m => m.ViewBranchPageModule)
  },
  {
    path: 'pdfviewer',
    loadChildren: () => import('./components/pdfviewer/pdfviewer.module').then( m => m.PdfviewerPageModule)
  },
  {
    path: 'viewmodal',
    loadChildren: () => import('./components/viewmodal/viewmodal.module').then( m => m.ViewmodalPageModule)
  },


  
  
  
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  // },
  // {
  //   path: 'admin/manage-users',
  //   loadChildren: () => import('./admin/manage-users/manage-users.module').then( m => m.ManageUsersPageModule)
  // },
  // {
  //   path: 'admin/documents',
  //   loadChildren: () => import('./admin/documents/documents.module').then( m => m.DocumentsPageModule)
  // },
  // {
  //   path: 'admin/schedules',
  //   loadChildren: () => import('./admin/schedules/schedules.module').then( m => m.SchedulesPageModule)
  // },
  // {
  //   path: 'auditor',
  //   loadChildren: () => import('./auditor/auditor.module').then( m => m.AuditorPageModule)
  // },
  // {
  //   path: 'auditor/documents',
  //   loadChildren: () => import('./auditor/documents/documents.module').then( m => m.DocumentsPageModule)
  // },
  // {
  //   path: 'auditor/schedule',
  //   loadChildren: () => import('./auditor/schedule/schedule.module').then( m => m.SchedulePageModule)
  // },
  // {
  //   path: 'auditor/audit',
  //   loadChildren: () => import('./auditor/audit/audit.module').then( m => m.AuditPageModule)
  // },
  // {
  //   path: 'department',
  //   loadChildren: () => import('./department/department.module').then( m => m.DepartmentPageModule)
  // },
  // {
  //   path: 'department/audit',
  //   loadChildren: () => import('./department/audit/audit.module').then( m => m.AuditPageModule)
  // },
  // {
  //   path: 'department/schedule',
  //   loadChildren: () => import('./department/schedule/schedule.module').then( m => m.SchedulePageModule)
  // },
  // {
  //   path: 'department/documents',
  //   loadChildren: () => import('./department/documents/documents.module').then( m => m.DocumentsPageModule)
  // },
 
  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'} ),
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
