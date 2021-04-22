import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {NgxDocViewerModule } from 'ngx-doc-viewer'
import { ViewmodalPageRoutingModule } from './viewmodal-routing.module';

import { ViewmodalPage } from './viewmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewmodalPageRoutingModule,
    NgxDocViewerModule
  ],
  declarations: [ViewmodalPage]
})
export class ViewmodalPageModule {}
