import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';

import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { AccPopoverComponent } from '../components/acc-popover/acc-popover.component';

declare var myFunction;
declare var myFunction1;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
 @ViewChild('viewer') viewerRef: ElementRef;
  constructor(public previewAnyFile: PreviewAnyFile, private popover: PopoverController) { 
    
  }

  ngAfterViewInit(){
    

  }


  ngOnInit() {
    
    
    
  }
  async _popOver(ev:any){
    const popover = await this.popover.create({
      component: PopoverComponent,
      event: ev
    })
    return await popover.present()
  }

  async acc_popover(ev:any){
    const popover = await this.popover.create({
      component: AccPopoverComponent,
      event: ev
    })
    return await popover.present()
  }


  PreviewPDfFile(){

    var url = "C:\Users\PERSONAL\Desktop\SS\ASSIGNMENT 02_ PERSONALITY TEST.docx";
    this.previewAnyFile.preview(url).then(()=> {


    },(err)=>{
alert(JSON.stringify(err));

    } )
  }

}
