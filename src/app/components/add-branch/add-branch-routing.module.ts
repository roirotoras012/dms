import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBranchPage } from './add-branch.page';

const routes: Routes = [
  {
    path: '',
    component: AddBranchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBranchPageRoutingModule {}
