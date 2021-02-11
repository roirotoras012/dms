import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditorPageRoutingModule } from './auditor-routing.module';

import { AuditorPage } from './auditor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditorPageRoutingModule
  ],
  declarations: [AuditorPage]
})
export class AuditorPageModule {}
