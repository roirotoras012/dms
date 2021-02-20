import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { AccPopoverComponent } from '../../components/acc-popover/acc-popover.component';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
 username: string;
 
  constructor(private popover: PopoverController) { }

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
}
