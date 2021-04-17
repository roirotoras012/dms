import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewBranchPageRoutingModule } from './view-branch-routing.module';

import { ViewBranchPage } from './view-branch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewBranchPageRoutingModule
  ],
  declarations: [ViewBranchPage]
})
export class ViewBranchPageModule {}
