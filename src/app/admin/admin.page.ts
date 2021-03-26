import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { AccPopoverComponent } from '../components/acc-popover/acc-popover.component';
import { Storage } from '@ionic/Storage'
const TOKEN_KEY = 'auth-token'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  account_info:any = []
  user_id: any

  constructor(private popover: PopoverController, private http: HttpClient,private storage: Storage) { 
    this.account();
  }
  ionViewWillEnter(){
     
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



  account(){

      this.storage.get(TOKEN_KEY).then((res)=>{
      this.http.get("https://localhost/dms/admin/account_info?user_id="+res.user_id)
      .subscribe(data => {
        
      this.account_info = data[0];
       
      
  
    
        }
      
      , err => {
        console.log(err);
      });
      
    })
    
   

  }
}


