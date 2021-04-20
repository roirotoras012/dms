import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, ModalController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { AccPopoverComponent } from '../components/acc-popover/acc-popover.component';




import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ToastController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { AppComponent } from '../app.component';
import { CalendarComponent } from 'ionic2-calendar/';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core'
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.scss'],
})
export class DepartmentPage implements OnInit {
  currentuser: any = [];
  dpmfolders: any =[]
  eventSource = [];
  auditors: any = []
 clicked: any = []
  event1 = {
    audit_id : '',
    title: '',
    link: '',
    auditor: '',
    auditee: '',
    startTime: null,
    endTime: null,
    
  };
  viewTitle: string;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(@Inject(LOCALE_ID) private locale: string,private alertCtrl: AlertController,private modalCtrl: ModalController,private component: AppComponent,private popover: PopoverController, private http: HttpClient,public toastController: ToastController, private router: Router, private userservice: UserServiceService) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.getuserinfo()
    this.getauditors()
   
  
  }

  getauditors(){
    this.userservice.get("https://localhost/dms/admin/getauditor").subscribe((res)=>{
  
      this.auditors = res 
  
 
})
  }
  
  getuserinfo(){
  
    this.userservice.userinfo().then((data)=>{
      this.http.get("https://localhost/dms/admin/account_info?user_id="+data.user_id)
      .subscribe(data2 => {
        
      this.currentuser = data2[0]
      
          this.getschedule()
    
        }
      
      , err => {
        console.log(err);
      });
      
    })



  
    

  }

  share(audit){

     const formData: FormData = new FormData();
   
    formData.append('audit', audit.audit_id)
    this.http.post("https://localhost/dms/admin/share",formData).subscribe((response: any) => {
  
    for(let i =0 ; i < this.dpmfolders.length; i ++){
        if(this.dpmfolders[i].audit_id == audit.audit_id){
           this.dpmfolders[i].isShared = 1;
            
        }


    }
      
    
 
  })


 

  }


  async sharealert(audit){
   

  const alert = await this.alertCtrl.create({
   
    header: "",
    subHeader: "",
    message: "Share "+audit.dpm_title+"?",
    buttons: ['Cancel', {
  
      text: 'Share',
      handler: ()=>{
        
        this.share(audit)
       
      }
      
  
    }],
  });
  alert.present();
  alert.onWillDismiss().then(()=>{
  

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

  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
   async onEventSelected(event) {
   
    let start = formatDate(event.startTime, 'medium', this.locale);
   
    let end = formatDate(event.endTime, 'medium', this.locale);
   
    const alert = await this.alertCtrl.create({
      
      header: event.title,
      subHeader: event.desc,
      message: start.slice(0,12)+'<br>'+start.slice(14,26 )+' - '+end.slice(14,26)+
      '<br>Auditor: '+event.auditor+'<br>Auditee: '+event.auditee+'<br><br>MEET LINK: '+event.link
      ,
    
      // message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK' , {

        text: 'Copy Link',
        handler: ()=>{
          
          this.copyMessage(event.link)
    
        }
    
      }],
    });
    alert.present();
    
    
   
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  
  removeEvents() {
    this.eventSource = [];
  }


  onTimeSelected(ev) {    
    
  }

  getschedule(){
    this.eventSource = [];
 
    this.userservice.get("https://localhost/dms/admin/getauditeesched?usertype_id="+this.currentuser.usertype).subscribe((sched)=>{
     
 
    
     
    for(let data of Object.values(sched)){

      if(data.done == 0){
        this.event1.audit_id = data.audit_id
        this.event1.title = data.dpm_title
        
        this.event1.auditee = data.usertype_title
        this.event1.auditor = data.name
        this.event1.link = data.link
        this.event1.startTime = new Date(data.startTime)
        this.event1.endTime = new Date(data.endTime)
      
        
        this.eventSource.push(this.event1)
        
        this.event1 = {
          audit_id:'',
          title: '',
          link: '',
          auditee: '',
          auditor: '',
          startTime: null,
          endTime: null,
        
        };
        this.myCal.loadEvents();


      }
      
  
      
    }

    this.getauditfolders(sched)


    
      //--- compare date interval in days ---//
    // let asd: any = new Date
    // let zxc= Math.floor((Date.UTC(this.eventSource[10].startTime.getFullYear(), this.eventSource[10].startTime.getMonth(), this.eventSource[10].startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24));
    // console.log(zxc)
     
    
      
  
    })
  
  
  
  }



  // let daysleft = (Math.floor((Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24)))
  getauditfolders(audit){
    this.dpmfolders = []
      let dpm = audit
      let time = new Date()
      for(let i =0; i< dpm.length; i ++){
        let startTime = new Date(dpm[i].startTime)
         if(startTime.getFullYear()-time.getFullYear() == 0 && startTime.getMonth()-time.getMonth() == 0 && startTime.getTime() - time.getTime()<0 && dpm[i].done == 0){

            this.dpmfolders.push(dpm[i]);
         

         }

           
      } 
 
    


  }







}
