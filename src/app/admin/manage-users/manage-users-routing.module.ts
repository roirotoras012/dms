import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageUsersPage } from './manage-users.page';

const routes: Routes = [
  {
    path: '',
    component: ManageUsersPage
  },  {
    path: 'edit-modal',
    loadChildren: () => import('./edit-modal/edit-modal.module').then( m => m.EditModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageUsersPageRoutingModule {}
