import { Component, OnInit, ChangeDetectorRef, ɵCompiler_compileModuleSync__POST_R3__  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserServiceService } from '../../services/user-service.service'
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { AccPopoverComponent } from '../../components/acc-popover/acc-popover.component';
import { AddFolderComponent } from '../../components/add-folder/add-folder.component';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { RightclickComponent } from 'src/app/components/rightclick/rightclick.component';
import { UploadComponent } from 'src/app/components/upload/upload.component';

import { ToastController, NavParams } from '@ionic/angular';

import { DocpopoverComponent } from '../../components/docpopover/docpopover.component';





@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
  
})
export class DocumentsPage implements OnInit {
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
  file_upload: File;
 fileinput: any;
  
  
  
  count;
  htmlToAdd: string;
  constructor(private toast: ToastController,private http: HttpClient,private userservice: UserServiceService,private popover: PopoverController, private modalCtrl: ModalController, private changeDetection: ChangeDetectorRef) {
  
  
 
    
    
  }
  trackByEmpCode(index: number, data1: any): string {
    return data1.foldername;
}
ionViewWillEnter(){
  this.getuserinfo()
 


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
      status: this.status
      


    },
    event: ev
  })

   await popover.present()
   popover.onDidDismiss().then(()=>{
    if(this.currentuser.user_level == 'head'){

      this.getdpmdocs(dir)

}else if(this.currentuser.user_level == 'co'){
  this.getdocs(dir)
}
   })
  

  
}


ionViewDidLeave(){

  this.folder_layer = []
  this.status = 'dpm'

}


newclicked(){

  if(this.folder_layer.length > 0){
  if(this.new == false){
    this.new = true


  }
  else{

    this.new = false
  }
}
  


}
getdocs(x){
  this.main = []
  this.evidences= []
  this.userservice.get("https://localhost/dms/admin/getdocs?user_id="+this.currentuser.user_id+"&directory="+x).subscribe((res)=>{
      this.documents = res
      console.log(res)
        console.log(this.documents)
      for(let i = 0; i < this.documents.length; i++){
        if(this.documents[i].doc_type == 'dpm' ){
            this.main.push(this.documents[i])


        }
        else if (this.documents[i].doc_type == 'evidence'){

          this.evidences.push(this.documents[i])
        }




      }
      


  })




}
selectedFile(event){
  this.file_upload = event.target.files[0];
 
}
async add_doc(){
  let dir = 'uploads/'+this.currentuser.usertype_title
  
  
  for(let i = 0; i < this.folder_layer.length; i++){
        dir = dir +'/'+this.folder_layer[i]
    
       }
  console.log(this.file_upload);
  const toast = await this.toast.create({
    message: 'Successfully Uploaded the file',
    duration: 2000
  });
  
  const formData: FormData = new FormData();
  formData.append('document', this.file_upload, this.file_upload.name)
  formData.append('directory', dir)
  formData.append('doc_type', this.status)
  formData.append('user', this.currentuser.user_id)
  this.http.post("https://localhost/dms/upload_controller/do_upload",formData).subscribe((response: any) => {
    console.log(response  );
    toast.present();
    
    this.fileinput = null
    this.file_upload =null
    if(this.currentuser.user_level == 'head'){

      this.getdpmdocs(dir)
  
  }else{
  this.getdocs(dir)
  }
  }
  )
 
 
}



getdpmdocs(x){
  this.main = []
  this.evidences= []
  this.userservice.get("https://localhost/dms/admin/getdpmdocs?user_id="+this.currentuser.user_id+"&directory="+x).subscribe((res)=>{

    this.documents = res
  console.log(this.documents)
    for(let i = 0; i < this.documents.length; i++){
      if(this.documents[i].doc_type == 'dpm' ){
          this.main.push(this.documents[i])


      }
      else if(this.documents[i].doc_type == 'evidence'){

        this.evidences.push(this.documents[i])
      }




    }

  })

    console.log(this.main)


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
   
  chosen = "uploads/"
  parent = "uploads"


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
    
      this.getdpms()
     
  
    
        }
      
      , err => {
        console.log(err);
      });
      
    })
}

getdpms(){
  console.log(this.currentuser)
  this.userservice.get("https://localhost/dms/admin/getdpms?usertype="+this.currentuser.usertype).subscribe((res)=>{

          this.dpm = res
      
     
  })




}


// getfol(){

//   let dir ='uploads/'+this.currentuser.usertype_title
//   for(let i = 0; i < this.folder_layer.length; i++){
//     dir = dir +"/"+this.folder_layer[i]

//   }
//   console.log(dir)
 
//   const formData: FormData = new FormData();
  
//   formData.append('directory', this.chosen+dir)

//     this.http.post("https://localhost/dms/admin/getfolders", formData )
//     .subscribe(data2 => {
//       console.log(this.folders)
//       this.folders = data2
     
   

  
//       }
    
//     , err => {
//       console.log(err);
//     });


// }
//  async chosen1(x){
//   this.chosen = x ;
//   this.http.get("https://localhost/dms/admin/getfolder?dpm_name="+x)
//     .subscribe(data2 => {
      
//     this.folders = data2
//       console.log(this.folders)
     
   

  
//       }
    
//     , err => {
//       console.log(err);
//     });
   
   
//  }

 
//  async back(){
  
//   if(this.folder_layer.length == 0){
//     this.chosen = null;
//   }
 
//   if(this.folder_layer != ""){
    
//     this.folder_layer.splice(-1,1)
//     let dir = ''
//       for(let i = 0; i < this.folder_layer.length; i++){
//         dir = dir +"/"+this.folder_layer[i]
    
//       }
     
//       const formData: FormData = new FormData();
      
//       formData.append('directory', this.chosen+dir)
// this.http.post("https://localhost/dms/admin/getfolders", formData )
//     .subscribe(data2 => {
      
//       this.folders = data2
     
   

  
//       }
    
//     , err => {
//       console.log(err);
//     });
//   console.log(this.folder_layer)

//   }
    
//  }

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


root(){ 
    this.folder_layer = []  
    this.new = false;
    this.status = 'dpm'


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
      if(this.currentuser.user_level == 'head'){

            this.getdpmdocs(dir)

      }else if(this.currentuser.user_level == 'co'){
        this.getdocs(dir)
      }
     

console.log(this.folder_layer)


}

direct(x){
  this.status = 'dpm'
  this.new = false;
  let dir = 'uploads/'+this.currentuser.usertype_title
console.log(x)
  for(let i =0; i <this.folder_layer.length; i++){
      if(x == this.folder_layer[i] && i !=this.folder_layer.length-1){
        this.folder_layer.splice(-1,1)


      }
   
  
  
      for(let i = 0; i < this.folder_layer.length; i++){
            dir = dir +'/'+this.folder_layer[i]
        
           }

        
            console.log(dir)
    
           this.userservice.get("https://localhost/dms/admin/getfolders?directory="+dir).subscribe((res)=>{
                  this.folders = res
                  console.log(res)
    
    
           })

  }

  if(this.currentuser.user_level == 'head'){

    this.getdpmdocs(dir)

}else if(this.currentuser.user_level == 'co'){
this.getdocs(dir)
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














}
