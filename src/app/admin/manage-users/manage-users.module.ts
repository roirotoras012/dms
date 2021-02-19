import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageUsersPageRoutingModule } from './manage-users-routing.module';

import { ManageUsersPage } from './manage-users.page';
import { AddModalComponent } from './add-modal/add-modal.component';
import { JwPaginationModule } from 'jw-angular-pagination';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageUsersPageRoutingModule,
    JwPaginationModule
  ],
  declarations: [ManageUsersPage, AddModalComponent],
  entryComponents: [AddModalComponent]
})
export class ManageUsersPageModule {}
