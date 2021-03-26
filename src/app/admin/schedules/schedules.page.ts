import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { AccPopoverComponent } from '../../components/acc-popover/acc-popover.component';

import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ToastController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.page.html',
  styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage implements OnInit {
currentuser: any = []
  constructor( private http: HttpClient, private popover: PopoverController, private userservice: UserServiceService) {

    this.getuserinfo();
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


  getuserinfo(){
  
    this.userservice.userinfo().then((data)=>{
      this.http.get("https://localhost/dms/admin/account_info?user_id="+data.user_id)
      .subscribe(data2 => {
        
      this.currentuser = data2[0]
   
       
      
  
    
        }
      
      , err => {
        console.log(err);
      });
      
    })



  
    

  }
}
