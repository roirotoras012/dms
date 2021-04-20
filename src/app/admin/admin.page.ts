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
 postData : any = []
 checked_users: any = []
  audit: any = [] 
  isIndeterminate:boolean;
  masterCheck:boolean;
  checkedUsers: any = [];
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




  submit(audit_plan_id){
    let start = formatDate(this.startTime, 'medium', this.locale);
    let end = formatDate(this.endTime, 'medium', this.locale);


    let dpm = []
   
  
  
     for(let i=0; i < this.selected_dpm.length; i++){

      const formData: FormData = new FormData();
      formData.append('audit_plan_id', audit_plan_id)
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
// async presentToast() {
//   const toast = await this.toastController.create({
//     message: 'User has been successfully deleted',
//     duration: 2000
//   });
//   toast.present();
// }

// async deleteUser() {
  
//     this.checked_users = this.navParams.get('checked_users');
    
//     this.checked_users.map(obj => {
//       this.postData.push(obj.user_id);
//     });
    
//     if(this.checked_users.length > 0 ){
//       this.presentToast();
      

//     }



//     this.http.post("https://localhost/dms/admin/removeuser", JSON.stringify(this.postData )) 
//       .subscribe(res => {
       
//         console.log(res);
//         this.modalCtrl.dismiss();
        
        
      
      
//   }, err => {
//     console.log(err);
//   });





    


//   }
async delete() {
  this.postData =  []
  this.checkedUsers = []
      this.audit.map(obj => {
        if (obj.isChecked) {
          this.checkedUsers.push(obj);
          
        };
      });
  
  this.checkedUsers.map(obj => {
    this.postData.push(obj.audit_id);
  });
  



  this.http.post("https://localhost/dms/admin/removeaudit", JSON.stringify(this.postData)) 
    .subscribe(res => {
     
     
   
      
      this.getaudit()
    
    
}, err => {
  console.log(err);
});





  


}
checkMaster() {
  setTimeout(()=>{
    this.audit.forEach(obj => {
      obj.isChecked = this.masterCheck;
    });
  });
}

mark(id){

  const formData: FormData = new FormData();
      formData.append('audit_plan_id', id)
      
        this.userservice.post("https://localhost/dms/admin/mark", formData).subscribe((res)=>{

          this.getauditplan()
              
        })



}


checkEvent() {
  const totalItems = this.audit.length;
  let checked = 0;
  this.audit.map(obj => {
    if (obj.isChecked) {checked++
      
    
    };
  });
  if (checked > 0 && checked < totalItems) {
    //If even one item is checked but not all
    this.isIndeterminate = true;
    this.masterCheck = false;
  } else if (checked == totalItems) {
    //If all are checked
    this.masterCheck = true;
    this.isIndeterminate = false;
    
  } else {
    //If none is checked
    this.isIndeterminate = false;
    this.masterCheck = false;
  }
}




getaudit(){

  this.userservice.get("https://localhost/dms/admin/getaudit").subscribe((res)=>{

      this.audit = res
     
   
      for(let i=0 ; i < this.audit.length; i++){
          let starTime = new Date(this.audit[i].startTime).toString().slice(0,21) 
          starTime = formatDate(starTime, 'medium', this.locale);
          let endTime= new Date(this.audit[i].endTime).toString().slice(0,21)
          endTime = formatDate(endTime, 'medium', this.locale);
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
       
     
    
        }
      
      , err => {
        console.log(err);
      });
      
    })



  
    




  }




getauditplan(){
  this.userservice.get("https://localhost/dms/admin/generate1").subscribe((res)=>{
    console.log(res)
      this.auditplan = res
let count  =0 
  for(let i = 0; i<this.auditplan.length; i++){
      if(this.auditplan[i].done == 0){
          count ++
      
      }

    
   

  } 

  if(count == 0){


    this.generate()
  }

     
    

  }
  )

}

  generate(){
    
        this.userservice.get("https://localhost/dms/admin/generate").subscribe((res)=>{

          this.auditplan = res
          this.getauditplan()
  
  
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

async markalert(id){
  console.log()
const alert = await this.alert.create({
 
  header: "",
  subHeader: "",
  message: "Are you sure?",
  buttons: ['Cancel', {

    text: 'Mark as Done',
    handler: ()=>{
      
      this.mark(id)

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


