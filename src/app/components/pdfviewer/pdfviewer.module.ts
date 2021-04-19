import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdfviewerPageRoutingModule } from './pdfviewer-routing.module';

import { PdfviewerPage } from './pdfviewer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfviewerPageRoutingModule
  ],
  declarations: [PdfviewerPage]
})
export class PdfviewerPageModule {}
