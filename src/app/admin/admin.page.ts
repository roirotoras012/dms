import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { AccPopoverComponent } from '../components/acc-popover/acc-popover.component';
import { Storage } from '@ionic/Storage'
import { UserServiceService } from '../services/user-service.service';
import { ArgumentType } from '@angular/compiler/src/core';
import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core'

const TOKEN_KEY = 'auth-token'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  selected_dpm: any
  auditor: any
  auditplan: any = []
  account_info:any = []
  user_id: any
  currentuser: any = []
  dpm: any = []
  startTime:any
  endTime: any
 auditors: any = []
 auditee: any = []
 link: any;
 auditeechoice: any;
  audit: any = [] 
  minDate: string= new Date().toISOString()
  maxDate: string= new Date().toISOString()
  constructor(private platform: Platform,@Inject(LOCALE_ID) private locale: string,private alert: AlertController,private userservice: UserServiceService,private popover: PopoverController, private http: HttpClient,private storage: Storage) { 
    this.account();

    this.platform.ready().then(()=>{
        let date:Date = new Date();
        date.setDate(date.getDate()-5);
        this.minDate   = date.toISOString();


        date = new Date();
        date.setDate(date.getDate()+5)
        this.maxDate = date.toISOString()

    }
    
    )



  }
  ionViewWillEnter(){
    this.getauditplan()
    this.getdpm()
    this.getuserinfo()
    this.getauditors()
    this.getauditee()
    this.getaudit()
  }

  ngAfterViewInit(){
   

  }


  ngOnInit() {
    
   
    
  }

  getauditors(){
    this.userservice.get("https://localhost/dms/admin/getauditor").subscribe((res)=>{
  
      this.auditors = res 
  
 
})


  }

  getauditee(){
    this.userservice.get("https://localhost/dms/admin/getauditee").subscribe((res)=>{
  
      this.auditee = res
     
 
})



  }


  
  getdpm(){

    this.userservice.get("https://localhost/dms/admin/getdpm").subscribe((res)=>{
  
            this.dpm = res
        
       
    })
  
  
  
  
  }
  showdate(){
    
  }

  submit(){
    let start = formatDate(this.startTime, 'medium', this.locale);
    let end = formatDate(this.endTime, 'medium', this.locale);


    let dpm = []
      console.log(this.startTime)
      console.log(end)

      console.log(this.auditeechoice)

      console.log(this.selected_dpm)
      console.log(this.auditor)
  
    console.log(dpm)
     for(let i=0; i < this.selected_dpm.length; i++){

      const formData: FormData = new FormData();
      formData.append('startTime', this.startTime.slice(0,16))
      formData.append('endTime', this.endTime.slice(0,16))
      formData.append('dpm', this.selected_dpm[i].dpm_id)
      formData.append('auditor', this.auditor)
      formData.append('auditee', this.auditeechoice)
      formData.append('link', this.link)
        this.userservice.post("https://localhost/dms/admin/addaudit", formData).subscribe((res)=>{
  
          this.getaudit()
              console.log(res)
              this.startTime =null
              this.endTime=null
              this.selected_dpm = null
              this.auditeechoice=''
              this.auditor=''
              this.link=''
        })

       


     }
 
    
    
    
}

getaudit(){

  this.userservice.get("https://localhost/dms/admin/getaudit").subscribe((res)=>{

      this.audit = res
      console.log(this.audit)
   
      for(let i=0 ; i < this.audit.length; i++){
          let starTime = new Date(this.audit[i].startTime).toString().slice(0,21)
          let endTime= new Date(this.audit[i].endTime).toString().slice(0,21)
          this.audit[i].startTime = starTime
          this.audit[i].endTime = endTime

      }


  })



}
get sortData(){
  return this.audit.sort((a, b) => {
    return <any>new Date(a.startTime) - <any>new Date(b.startTime);
  });
}

  getuserinfo(){
  
    this.userservice.userinfo().then((data)=>{
      this.http.get("https://localhost/dms/admin/account_info?user_id="+data.user_id)
      .subscribe(data2 => {
        
      this.currentuser = data2[0]
        console.log(this.currentuser)
     
    
        }
      
      , err => {
        console.log(err);
      });
      
    })



  
    

  }
getauditplan(){
  this.userservice.get("https://localhost/dms/admin/generate1").subscribe((res)=>{

      this.auditplan = res

    

  }
  )

}

  generate(){

      this.userservice.get("https://localhost/dms/admin/generate").subscribe((res)=>{

        this.auditplan = res
        console.log(this.auditplan  )


      })


}

async alert1(){
  console.log()
const alert = await this.alert.create({
 
  header: "",
  subHeader: "",
  message: "Are you sure?",
  buttons: ['Cancel', {

    text: 'Generate',
    handler: ()=>{
      
      this.generate()

    }

  }],
});
alert.present();
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


