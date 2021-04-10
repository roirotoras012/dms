import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import Peer from 'peerjs'
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
    this.peer = new Peer();
    
    setTimeout(()=>{
      this.mypeerid = this.peer.id;

    },1000)
    // console.log(this.peer.id) 
    this.peer.on('connection', function(conn){
      conn.on('data', function(data){
        console.log(data)
      });
      
    });


    setTimeout(() => {
      let video = this.myVideo.nativeElement
      var n = <any>navigator;
      n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
  
      this.peer.on('call',function(call){
        n.getUserMedia({video: true, audio: true},function(stream){
            call.answer(stream);
            call.on('stream', function(remotestream){
           
             video.srcObject = remotestream
             video.play();
            }, function(err){
  
              console.log('Failed to get stream', err);
             })
  
        })
  
      })
    }, 1000);
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
