import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserServiceService } from '../../services/user-service.service'
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { AccPopoverComponent } from '../../components/acc-popover/acc-popover.component';
import { AddFolderComponent } from '../../components/add-folder/add-folder.component';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { RightclickComponent } from 'src/app/components/rightclick/rightclick.component';
import { UploadComponent } from 'src/app/components/upload/upload.component';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  currentuser: any = [];
  departments: any= [];
  chosen: any;
  folders: any = []
  folder_layer: any = []
  currdir: any; 
  constructor(private http: HttpClient,private userservice: UserServiceService,private popover: PopoverController, private modalCtrl: ModalController) {
    
    this.getuserinfo()
    this.getdep()
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
 

  async add_folder(){
    console.log(this.folder_layer.length)
    let dir = ''
    if(this.folder_layer.length != 0){
  for(let i = 0; i < this.folder_layer.length; i++){
    dir = dir +"/"+this.folder_layer[i]

  }
}
 
  console.log(dir)
 
  
    let data= {
      user_id: this.currentuser.user_id,
      currfolder: this.chosen+dir,
      department: this.chosen

    }

    





    const modal = await this.modalCtrl.create({
      component: AddFolderComponent,
      componentProps: {
       data: data
        


      }
    

    });
    
    await modal.present();
    await modal.onWillDismiss();
    this.getfol();
       
    
  }
  async upload(){
    const modal = await this.modalCtrl.create({
      component: UploadComponent,
     
    

    });
    
    await modal.present();
       
    
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
getdep(){
  
  
    this.http.get("https://localhost/dms/admin/getdep")
    .subscribe(data2 => { 
      
    this.departments = data2
      console.log(this.departments  )
     
   

  
      }
    
    , err => {
      console.log(err);
    });
    
 
}

getfol(){

  let dir = ''
  for(let i = 0; i < this.folder_layer.length; i++){
    dir = dir +"/"+this.folder_layer[i]

  }
  console.log(dir)
 
  const formData: FormData = new FormData();
  
  formData.append('directory', this.chosen+dir)

    this.http.post("https://localhost/dms/admin/getfolders", formData )
    .subscribe(data2 => {
      
      this.folders = data2
     
   

  
      }
    
    , err => {
      console.log(err);
    });


}
 async chosen1(x){
  this.chosen = x ;
  this.http.get("https://localhost/dms/admin/getfolder?department_name="+x)
    .subscribe(data2 => {
      
    this.folders = data2
      console.log(this.folders)
     
   

  
      }
    
    , err => {
      console.log(err);
    });
   
   
 }

 
 async back(){
  
  if(this.folder_layer.length == 0){
    this.chosen = null;
  }
 
  if(this.folder_layer != ""){
    
    this.folder_layer.splice(-1,1)
    let dir = ''
      for(let i = 0; i < this.folder_layer.length; i++){
        dir = dir +"/"+this.folder_layer[i]
    
      }
     
      const formData: FormData = new FormData();
      
      formData.append('directory', this.chosen+dir)
this.http.post("https://localhost/dms/admin/getfolders", formData )
    .subscribe(data2 => {
      
      this.folders = data2
     
   

  
      }
    
    , err => {
      console.log(err);
    });
  console.log(this.folder_layer)

  }
    
 }

onRightClick(ev, x) {
  this.right(ev);

  return false;

  
}
async right(ev){
  const popover = await this.popover.create({
    event: ev,
    component: RightclickComponent,
    
    
  })
  return await popover.present()
}

async choice(x){
  this.folder_layer.push(x)

  console.log(this.folder_layer)
  let dir = ''
  for(let i = 0; i < this.folder_layer.length; i++){
    dir = dir +"/"+this.folder_layer[i]

  }
  console.log(dir)
  // this.currdir = this.chosen
  const formData: FormData = new FormData();
  
  formData.append('directory', this.chosen+dir)

    this.http.post("https://localhost/dms/admin/getfolders", formData )
    .subscribe(data2 => {
      
      this.folders = data2
     
   

  
      }
    
    , err => {
      console.log(err);
    });



}

async direct(x){
  if(this.folder_layer.length != 0){
    while(this.folder_layer[this.folder_layer.length-1] != x)
    this.folder_layer.splice(-1,1)
    this.getfol();
   
  }
  // else if(x == "doc"){
  //  this.chosen = null

  // }
  else{
    
    this.getfol();

  }

  
  

}

doc(){
    this.chosen = null
    this.folder_layer = []

}

}
