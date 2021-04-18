import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';

import { AccPopoverComponent } from '../../components/acc-popover/acc-popover.component';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {
  @ViewChild('myvideo') myVideo: any;
  peer;
  another_id;
  mypeerid;
 
  constructor(private popover: PopoverController) { 
   
     
     
    
  }

  ngOnInit() {
    
  }

  connect(){
          var conn = this.peer.connect(this.another_id);
          conn.on('open', function(){
            conn.send('hi!');
          });

  }

  videoconnect(){
    let video =  this.myVideo.nativeElement;
    var localvar=  this.peer;
    var fname = this.another_id

    var n = <any>navigator;
    n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
    n.getUserMedia({video:true, audio:true},function(stream){
       var call = localvar.call(fname, stream);
       call.on('stream', function(remotestream){
       video.srcObject = remotestream
        video.play();

       }, function(err){

        console.log('Failed to get stream', err);
       }
       )
        

    })


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
