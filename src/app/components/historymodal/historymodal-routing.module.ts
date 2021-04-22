import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorymodalPage } from './historymodal.page';

const routes: Routes = [
  {
    path: '',
    component: HistorymodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorymodalPageRoutingModule {}
