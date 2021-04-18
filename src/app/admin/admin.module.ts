import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    IonicSelectableModule
    
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
