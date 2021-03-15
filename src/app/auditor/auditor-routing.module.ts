import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditorPage } from './auditor.page';

const routes: Routes = [
  {
    path: '',
    component: AuditorPage
  },
  {
    path: 'audit',
    loadChildren: () => import('./audit/audit.module').then( m => m.AuditPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./documents/documents.module').then( m => m.DocumentsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditorPageRoutingModule {}
