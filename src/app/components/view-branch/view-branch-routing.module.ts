import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBranchPage } from './view-branch.page';

const routes: Routes = [
  {
    path: '',
    component: ViewBranchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBranchPageRoutingModule {}
