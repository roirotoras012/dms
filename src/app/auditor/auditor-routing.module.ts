import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditorPage } from './auditor.page';

const routes: Routes = [
  {
    path: '',
    component: AuditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditorPageRoutingModule {}
