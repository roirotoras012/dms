import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './../components/popover/popover.component';
import { DocpopoverComponent } from './../components/docpopover/docpopover.component';
import { AccPopoverComponent } from './../components/acc-popover/acc-popover.component';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Storage } from '@ionic/Storage'
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
const TOKEN_KEY = 'auth-token'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  admin: boolean = false
  department: boolean = false
  auditor : boolean = false
  currentuser: any = []

  constructor(private userservice: UserServiceService,private popover: PopoverController, private http: HttpClient, private storage: Storage,private router: Router) { 

    
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
  ionViewWillEnter(){
    this.getuserinfo();
    this.storage.get(TOKEN_KEY).then((res)=>{


      if(res.usertype == "admin"){
        this.admin = true
        this.department = false

      }
   
      else if(res.usertype == "auditor"){
        this.auditor = true
        this.department = false
        this.admin = false
        

      }
      else{
        this.department = true
        this.admin = false
        this.auditor = false
      
      }
      
    })
 }

  async gotodocuments(){
    this.storage.get(TOKEN_KEY).then((res)=>{


      if(res.usertype == "admin"){
       
        this.router.navigate(['/admin/documents'])


      }
    
      else if(res.usertype == "auditor"){
        
        this.router.navigate(['/auditor/documents'])

      } else{
     
        this.router.navigate(['/department/documents'])
        
      }
      
    })

  }
  async gotohome(){
    this.storage.get(TOKEN_KEY).then((res)=>{


      if(res.usertype == "admin"){
       
        this.router.navigate(['/admin'])


      }
     
      else if(res.usertype == "auditor"){
        
        this.router.navigate(['/auditor'])

      } else{
     
        this.router.navigate(['/department'])
        
      }
      
    })

  }
  async gotoschedules(){
    this.storage.get(TOKEN_KEY).then((res)=>{


      if(res.usertype == "admin"){
       
        this.router.navigate(['/admin/schedules'])


      }
   
      else if(res.usertype == "auditor"){
        
        this.router.navigate(['/auditor/schedule'])

      }else{
     
        this.router.navigate(['/department/schedule'])
        
      }
      
    })

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
