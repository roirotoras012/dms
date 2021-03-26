import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { DocpopoverComponent } from '../../components/docpopover/docpopover.component';
import { AccPopoverComponent } from '../../components/acc-popover/acc-popover.component';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ToastController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { AppComponent } from '../../app.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
declare var myFunction1;

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
  constructor(private component: AppComponent,private popover: PopoverController, private http: HttpClient,public toastController: ToastController, private router: Router, private userservice: UserServiceService) {
    this.getuserinfo();
    
   }

  ngOnInit() {
   
  }
  ionViewWillEnter(){
    this.getdoc();
    
   
    

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
  async doc_popover(x, ev){

    
    const popover = await this.popover.create({
      component: DocpopoverComponent,
      componentProps: {
        document : x
        


      },
      event: ev
    })
  
    return await popover.present()
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
 
    this.http.get("https://localhost/dms/admin/get_doc") 
      .subscribe(res => {
        console.log(res);
        this.datauser = res;
    console.log(this.datauser);
 
    
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
   
       
      
  
    
        }
      
      , err => {
        console.log(err);
      });
      
    })



  
    

  }

}
