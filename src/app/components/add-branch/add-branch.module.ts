import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBranchPageRoutingModule } from './add-branch-routing.module';

import { AddBranchPage } from './add-branch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBranchPageRoutingModule
  ],
  declarations: [AddBranchPage]
})
export class AddBranchPageModule {}
