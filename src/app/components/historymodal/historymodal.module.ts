import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorymodalPageRoutingModule } from './historymodal-routing.module';

import { HistorymodalPage } from './historymodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorymodalPageRoutingModule
  ],
  declarations: [HistorymodalPage]
})
export class HistorymodalPageModule {}
