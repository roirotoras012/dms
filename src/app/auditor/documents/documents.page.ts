import { Component, OnInit } from '@angular/core';


'@angular/core';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { AddFolderComponent } from '../../components/add-folder/add-folder.component';
import { DocpopoverComponent } from '../../components/docpopover/docpopover.component';
import { AccPopoverComponent } from '../../components/acc-popover/acc-popover.component';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ToastController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { AppComponent } from '../../app.component';
import { CalendarComponent } from 'ionic2-calendar/';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core'
import { formatDate } from '@angular/common';
import { environment } from '../../../environments/environment';
const API_URL = environment.API_URL
@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  username: string;
  file_upload: File;
  fileinput: any;
  datauser: any = [];
  currentuser: any = [];
  folder_layer: any = []
  new: boolean = false
  folders: any = []
  touchtime = 0;
  x1: any ;
  docs: any = []
 
  event: any = [];
  eventSource = [];
 
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

  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  

  
  removeEvents() {
    this.eventSource = [];
  }


  onTimeSelected(ev) {    
    
  }

  async deleteconfirm(event){
    let ev = event
    const alert = await this.alertCtrl.create({
      header: 'Are you sure you want to delete this shedule?',
      message: ev.title+'<br>'+ev.description,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Okay',
          handler: () => {
            // this.deletesched(ev);
          }
        }
      ]
    });

    await alert.present();
     


  }




  ngOnInit() {
   
  }
  ionViewWillEnter(){
    this.getuserinfo()
  
   
  
  }

  newclicked(){

   
    if(this.new == false){
      this.new = true
  
  
    }
    else{
  
      this.new = false
    }
  
    
  
  
  }
  folderclicked(x){
    if (this.touchtime == 0) {
      this.x1 = x
     
      this.touchtime = new Date().getTime();
      
    } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (new Date().getTime() - this.touchtime < 300) {
        // double click occurred
        if(this.x1 == x){
          this.folclick(x)
          
        
        }
        this.touchtime = 0;
      } else {
        // not a double click so set as a new first click
        
        this.touchtime = new Date().getTime();
       
      }
    }
  
  
  
  
  
  }
  folclick(x){
  
    this.folder_layer.push(x)
    let dir = 'uploads/'+this.currentuser.usertype_title+'/'+this.currentuser.username  
    
    
    for(let i = 0; i < this.folder_layer.length; i++){
          dir = dir +'/'+this.folder_layer[i]
      
         }
          
  
         this.userservice.get(API_URL+"admin/getfolders?directory="+dir).subscribe((res)=>{
                this.folders = res
                console.log(res)
  
  
         })
        this.getfolders();
        this.getdoc()

 
  
  }
  

  async add_folder(){
    let dir = 'uploads/'+this.currentuser.usertype_title+'/'+this.currentuser.username
    
    
    for(let i = 0; i < this.folder_layer.length; i++){
          dir = dir +'/'+this.folder_layer[i]
      
         }
   
   
     let data= {
          dir : dir     
 
     }

 
     
 
 
 
 
 
     const modal = await this.modalCtrl.create({
       component: AddFolderComponent,
       componentProps: {
        data: data
         
 
 
       }
     
 
     });
     
     await modal.present();
     await modal.onWillDismiss();
     this.getfolders()
        
   
   }

 getfolders(){
   
  let dir = 'uploads/'+this.currentuser.usertype_title+'/'+this.currentuser.username
    
    
    for(let i = 0; i < this.folder_layer.length; i++){
          dir = dir +'/'+this.folder_layer[i]
      
         }
   
   
     let data= {
          dir : dir     
 
     }

  this.userservice.get(API_URL+"admin/getfolders?directory="+dir).subscribe((res)=>{
    this.folders = res
  


})



 }

   async add_doc(){
    let dir = 'uploads/'+this.currentuser.usertype_title+'/'+this.currentuser.username
    
    
    for(let i = 0; i < this.folder_layer.length; i++){
          dir = dir +'/'+this.folder_layer[i]
      
         }
    console.log(this.file_upload);
    const toast = await this.toastController.create({
      message: 'Successfully Uploaded the file',
      duration: 2000
    });
    const toast2 = await this.toastController.create({
      message: 'filename already exist',
      duration: 2000
    });
    
    
    const formData: FormData = new FormData();
    formData.append('document', this.file_upload, this.file_upload.name)
    formData.append('directory', dir)
    
    formData.append('user', this.currentuser.user_id)
    this.http.post(API_URL+"upload_controller/do_upload",formData).subscribe((response: any) => {
     if(response == 'success'){
      toast.present();

     }
     else if(response == 'filename already exist'){

      toast2.present();
     }
     
      
      this.fileinput = null
      this.file_upload =null
      this.getdoc();
    
    }
    )
   
   
  }

  
  selectedFile(event){
    this.file_upload = event.target.files[0];
   
  }

  async onClick(){
    
    const toast = await this.toastController.create({
      message: 'Successfully Uploaded the file',
      duration: 2000
    });
    
    const formData: FormData = new FormData();
    formData.append('document', this.file_upload, this.file_upload.name)
    this.http.post(API_URL+"upload_controller/do_upload",formData).subscribe((response: any) => {
      console.log(response  );
      toast.present();
      
      this.fileinput = null
      this.router.navigateByUrl('admin', {skipLocationChange: true}).then(()=>
       
       
          this.router.navigate(['../documents'])
      
       
  
  
  
  
  );
    }
    )
    
   
  }

  root(){ 
    this.folder_layer = []  
    
    this.getfolders()
    this.getdoc()

}

direct(x){
  
  
  
console.log(x)
  for(let i =0; i <this.folder_layer.length; i++){
      if(x == this.folder_layer[i] && i !=this.folder_layer.length-1){
        this.folder_layer.splice(-1,1)


      }
   
      let dir = 'uploads/'+this.currentuser.usertype_title+'/'+this.currentuser.username
  
      for(let i = 0; i < this.folder_layer.length; i++){
            dir = dir +'/'+this.folder_layer[i]
        
           }

        
          
    
           this.userservice.get(API_URL+"admin/getfolders?directory="+dir).subscribe((res)=>{
                  this.folders = res
                  console.log(res)
                  
    
           })

  }
        this.getdoc()
        this.getfolders()

}
  async doc_popover(x, ev){
    let dir = 'uploads/'+this.currentuser.usertype_title+'/'+this.currentuser.username
  
  
    for(let i = 0; i < this.folder_layer.length; i++){
          dir = dir +'/'+this.folder_layer[i]
      
         }
    
    const popover = await this.popover.create({
      component: DocpopoverComponent,
      componentProps: {
        document : x,
        user: this.currentuser.user_id,
        directory: dir,
       
        


      },
      event: ev
    })
  
    await popover.present()
    popover.onWillDismiss().then(()=>{
        this.getuserinfo()


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


  async getdoc() {
    let dir = 'uploads/'+this.currentuser.usertype_title+'/'+this.currentuser.username
    
    
    for(let i = 0; i < this.folder_layer.length; i++){
          dir = dir +'/'+this.folder_layer[i]
      
         }
 
    this.http.get(API_URL+"admin/get_doc?user_id="+this.currentuser.user_id+"&directory="+dir) 
      .subscribe(res => {
       
        this.docs = res;
 
 
    
        }
      
      , err => {
        console.log(err);
      });


  


     


  }
  


  getuserinfo(){
  
    this.userservice.userinfo().then((data)=>{
      this.http.get(API_URL+"admin/account_info?user_id="+data.user_id)
      .subscribe(data2 => {
        
      this.currentuser = data2[0]
   
      this.getfolders()
      
      this.getdoc();
      this.getschedule()
    
        }
      
      , err => {
        console.log(err);
      });
      
    })



  
    

  }






  



  getschedule(){
    this.eventSource = [];
    
    this.userservice.get(API_URL+"admin/getauditorsched?usertype_id="+this.currentuser.user_id).subscribe((sched)=>{
     
   
    
     
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
    

    


    
      //--- compare date interval in days ---//
    // let asd: any = new Date
    // let zxc= Math.floor((Date.UTC(this.eventSource[10].startTime.getFullYear(), this.eventSource[10].startTime.getMonth(), this.eventSource[10].startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24));
    // console.log(zxc)
     
    
      
  
    })
  
  
  
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



  // let daysleft = (Math.floor((Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24)))
 






  
}
