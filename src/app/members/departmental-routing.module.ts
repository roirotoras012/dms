import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  
  // {
  //   path: 'admin',
  //   loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule)
  // },
  // {
  //   path: 'admin/manage-users',
  //   loadChildren: () => import('../admin/manage-users/manage-users.module').then( m => m.ManageUsersPageModule)
  // },
  // {
  //   path: 'admin/documents',
  //   loadChildren: () => import('../admin/documents/documents.module').then( m => m.DocumentsPageModule)
  // },
  // {
  //   path: 'admin/schedules',
  //   loadChildren: () => import('../admin/schedules/schedules.module').then( m => m.SchedulesPageModule)
  // },
  // {
  //   path: 'auditor',
  //   loadChildren: () => import('../auditor/auditor.module').then( m => m.AuditorPageModule)
  // },
  // {
  //   path: 'auditor/documents',
  //   loadChildren: () => import('../auditor/documents/documents.module').then( m => m.DocumentsPageModule)
  // },
  // {
  //   path: 'auditor/schedule',
  //   loadChildren: () => import('../auditor/schedule/schedule.module').then( m => m.SchedulePageModule)
  // },
  // {
  //   path: 'auditor/audit',
  //   loadChildren: () => import('../auditor/audit/audit.module').then( m => m.AuditPageModule)
  // },
  {
    path: 'department',
    loadChildren: () => import('../department/department.module').then( m => m.DepartmentPageModule)
  },
  {
    path: 'department/audit',
    loadChildren: () => import('../department/audit/audit.module').then( m => m.AuditPageModule)
  },
  {
    path: 'department/schedule',
    loadChildren: () => import('../department/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'department/documents',
    loadChildren: () => import('../department/documents/documents.module').then( m => m.DocumentsPageModule)
  },
 
  



];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    
  ],
  exports: [RouterModule]
})
export class DepartmentalRoutingModule { }
