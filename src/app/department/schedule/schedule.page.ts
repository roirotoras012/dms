import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { AccPopoverComponent } from '../../components/acc-popover/acc-popover.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
 pdfSrc = this.DomSanitizer.bypassSecurityTrustResourceUrl("http://localhost/dms/uploads/CITC/DPM-USTP-ACAD-01%20CITC/Mark-resume.pdf")
  constructor(private popover: PopoverController, private DomSanitizer: DomSanitizer) {

    console.log(this.pdfSrc)
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
}
