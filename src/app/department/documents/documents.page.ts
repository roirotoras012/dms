import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
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
  
  
  count;
  htmlToAdd: string;
  constructor(private http: HttpClient,private userservice: UserServiceService,private popover: PopoverController, private modalCtrl: ModalController, private changeDetection: ChangeDetectorRef) {
    
    this.getuserinfo()
    this.getdep()
    
  }
  trackByEmpCode(index: number, data1: any): string {
    return data1.foldername;
}

  ngOnInit() {
  }
  trackByFn(index: any, item: any) {
    return item.foldername;
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
   if(this.chosen){
    let dir = ''
    let parent_dir = ''
    let parent = ''
    if(this.folder_layer.length != 0){
  for(let i = 0; i < this.folder_layer.length; i++){
    dir = dir +"/"+this.folder_layer[i]
    if(i < this.folder_layer.length-1){
    parent_dir = dir +"/"+this.folder_layer[i]
  }
  }
  parent = this.folder_layer[this.folder_layer.length-1]
}else
{
  parent = this.chosen

}
 let chosen
 
 if(this.chosen == null){
   
  chosen = "main_uploaads/"
  parent = "main_uploads"


 }
 else{
  chosen = this.chosen
  
 }
 
  console.log(this.folder_layer)
  
  
    let data= {
      user_id: this.currentuser.user_id,
      currfolder: chosen+dir,
      department: this.chosen,
      parent_folder: parent,
      parent_path: chosen+dir

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
  
  
    this.http.get("https://localhost/dms/admin/getdep1")
    .subscribe(data2 => { 
      
    this.departments = data2
      console.log(this.departments)
     
   

  
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


newclicked(){
  if(this.new == false){
    this.new = true
  }
  else{

    this.new=false
  }

}


async once(data){
  if (this.touchtime == 0) {
    // set first click
    this.touchtime = new Date().getTime();
  } else {
    // compare first click to this click and see if they occurred within double click threshold
    if (new Date().getTime() - this.touchtime < 300) {
      // double click occurred
      this.choice(data);
      this.touchtime = 0;
    } else {
      // not a double click so set as a new first click
      this.touchtime = new Date().getTime();
    }
  }


}

async once1(x){
 
  if (this.touchtime == 0) {
    this.x1 = x
    console.log("asdasd")   
    this.touchtime = new Date().getTime();
    
  } else {
    // compare first click to this click and see if they occurred within double click threshold
    if (new Date().getTime() - this.touchtime < 300) {
      // double click occurred
      if(this.x1 == x){
      this.chosen1(x)
      
      }
      this.touchtime = 0;
    } else {
      // not a double click so set as a new first click
      console.log("asdasd") 
      this.touchtime = new Date().getTime();
     
    }
  }


}

async docdir(){
  if(this.dirdoc == false){
    this.dirdoc = true

  }
  else{
    this.dirdoc = false

  }

}
async sidedir(x){
  
  // if(this.clickedfolders.length != 0){
  //   for(let i = 0 ; i < this.clickedfolders.length; i++){
  //     if(x == this.clickedfolders[i]){

  //      this.clickedfolders.splice(i,1)
  //     }
  //     if(x != this.clickedfolders[i] && i == this.clickedfolders.length-1){
  //       this.clickedfolders.push(x)
  //     }
      

      
  //   }


  // }
  // else{
  //   this.clickedfolders.push(x)
  // }

  if(this.clickedfolders.includes(x)){
    this.clickedfolders.splice(this.clickedfolders.indexOf(x),1)
  }
  else{
    this.clickedfolders.push(x)
  }
 
   

  
  
  console.log(this.clickedfolders)
  
 
  



  this.http.get("https://localhost/dms/admin/allfolders")
    .subscribe(data2 => { 
      if(data2){
    this.allfolders = data2
   
      console.log(this.allfolders)
    
   
    }
  
      }
    
    , err => {
      console.log(err);
    });

  }

  async subfolder(x){
    this.chosen = x;
    this.folder_layer = []
    this.getfol();


  }
  







}
