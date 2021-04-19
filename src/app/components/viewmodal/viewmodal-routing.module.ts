import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewmodalPage } from './viewmodal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewmodalPageRoutingModule {}
