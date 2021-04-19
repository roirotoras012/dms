
import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { AddFolderComponent } from '../../components/add-folder/add-folder.component';
import { DocpopoverComponent } from '../../components/docpopover/docpopover.component';
import { Docpopover2Component } from '../../components/docpopover2/docpopover2.component';
import { AccPopoverComponent } from '../../components/acc-popover/acc-popover.component';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ToastController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { AppComponent } from '../../app.component';
import { CalendarComponent } from 'ionic2-calendar/';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core'
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {
  dpmfolders: any =[]
  status: any = 'dpm'
  new: boolean = false
  currentuser: any = [];
  departments: any= [];
  chosen: any;
  folders: any = []
  folder_layer: any = []
  currdir: any; 
  touchtime = 0;
  x1: any ;
  dirdoc: boolean = false;
  sidedirectory: any = [];
  paths: any = [];
  allfolders: any = []
  clickedfolders: any = []
  dpm : any = []
  documents: any = []
  main: any = []
  evidences: any = []
  branch_docs: any = []

  username: string;
 file_upload: File;
 fileinput: any;
 datauser: any = [];

 docs: any = []

 event: any = [];
 eventSource = [];

 event1 = {
   audit_id : '',
   title: '',
   
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
  constructor(@Inject(LOCALE_ID) private locale: string,private alertCtrl: AlertController,private modalCtrl: ModalController,private component: AppComponent,private popover: PopoverController, private http: HttpClient,public toastController: ToastController, private router: Router, private userservice: UserServiceService) {
  
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
    let dir = 'uploads/'+this.currentuser.usertype_title
    
    
    for(let i = 0; i < this.folder_layer.length; i++){
          dir = dir +'/'+this.folder_layer[i]
      
         }
          console.log(dir)
  
         this.userservice.get("https://localhost/dms/admin/getfolders?directory="+dir).subscribe((res)=>{
                this.folders = res
                console.log(res)
  
  
         })
        this.getfolders();
        this.getdoc()

  console.log(this.folder_layer)
  
  
  }
  

  async add_folder(){
    let dir = 'uploads/'+this.currentuser.usertype_title
    
    
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
   
  let dir = 'uploads/'+this.currentuser.usertype_title
    
    
    for(let i = 0; i < this.folder_layer.length; i++){
          dir = dir +'/'+this.folder_layer[i]
      
         }
   
   
     let data= {
          dir : dir     
 
     }

  this.userservice.get("https://localhost/dms/admin/getfolders?directory="+dir).subscribe((res)=>{
    this.folders = res
    console.log(res)


})



 }

   async add_doc(){
    let dir = 'uploads/'+this.currentuser.usertype_title
    
    
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
    this.http.post("https://localhost/dms/upload_controller/do_upload",formData).subscribe((response: any) => {
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
    console.log(this.file_upload);
    const toast = await this.toastController.create({
      message: 'Successfully Uploaded the file',
      duration: 2000
    });
    
    const formData: FormData = new FormData();
    formData.append('document', this.file_upload, this.file_upload.name)
    this.http.post("https://localhost/dms/upload_controller/do_upload",formData).subscribe((response: any) => {
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
   
      let dir = 'uploads/'+this.currentuser.usertype_title
  
      for(let i = 0; i < this.folder_layer.length; i++){
            dir = dir +'/'+this.folder_layer[i]
        
           }

        
            console.log(dir)
    
           this.userservice.get("https://localhost/dms/admin/getfolders?directory="+dir).subscribe((res)=>{
                  this.folders = res
                  console.log(res)
                  
    
           })

  }
        this.getdoc()
        this.getfolders()

}
  async doc_popover(x, ev){
    let dir = 'uploads/'+this.currentuser.usertype_title
  
  
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
        this.getdoc()


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
    this.main = []
  this.evidences= []
    let dir = 'uploads/'+this.currentuser.usertype_title
    
    
    for(let i = 0; i < this.folder_layer.length; i++){
          dir = dir +'/'+this.folder_layer[i]
      
         }
 
    this.http.get("https://localhost/dms/admin/get_doc?user_id="+this.currentuser.user_id+"&directory="+dir) 
      .subscribe(res => {
        console.log(res);
        this.docs = res;
    console.log(this.docs);
    for(let i = 0; i < this.docs.length; i++){
      if(this.docs[i].doc_type == 'dpm' ){
          this.main.push(this.docs[i])


      }
      else if (this.docs[i].doc_type == 'evidence'){

        this.evidences.push(this.docs[i])
      }




    }
    console.log(this.main)
        }
      
      , err => {
        console.log(err);
      });


  


     


  }
  


  getuserinfo(){
  
    this.userservice.userinfo().then((data)=>{
      this.http.get("https://localhost/dms/admin/account_info?user_id="+data.user_id)
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
  async doc_popover2(x, ev){
    let dir = 'uploads/'+this.currentuser.usertype_title+'/'+this.currentuser.username
  
  
    for(let i = 0; i < this.folder_layer.length; i++){
          dir = dir +'/'+this.folder_layer[i]
      
         }
    
    const popover = await this.popover.create({
      component: Docpopover2Component,
      componentProps: {
        document : x,
        user: this.currentuser.user_id,
        directory: dir,
       
        


      },
      event: ev
    })
  
    await popover.present()
    popover.onWillDismiss().then(()=>{
        this.getdoc()


    })
  }
  getschedule(){
    this.eventSource = [];
    
    this.userservice.get("https://localhost/dms/admin/getauditeesched?usertype_id="+this.currentuser.usertype).subscribe((sched)=>{
     
    console.log(sched)
    
   
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
         if(startTime.getFullYear()-time.getFullYear() == 0 && startTime.getMonth()-time.getMonth() == 0 && startTime.getTime() - time.getTime()<0 ){
          if(dpm[i].isShared == 1 && dpm[i].done == 0){
            this.dpmfolders.push(dpm[i]);
          }
         
         

         }

           
      } 
 
      console.log(this.dpmfolders)



  }




}
