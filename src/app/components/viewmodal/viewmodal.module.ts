import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewmodalPageRoutingModule } from './viewmodal-routing.module';

import { ViewmodalPage } from './viewmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewmodalPageRoutingModule
  ],
  declarations: [ViewmodalPage]
})
export class ViewmodalPageModule {}
