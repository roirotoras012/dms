import { Component, OnInit } from '@angular/core';

import { ToastController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Router } from '@angular/router';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { UserServiceService } from '../../services/user-service.service';
import { AddBranchPage } from '../add-branch/add-branch.page';
import { ViewBranchPage } from '../view-branch/view-branch.page';
import { ViewmodalPage } from '../viewmodal/viewmodal.page';
import { environment } from '../../../environments/environment';
const API_URL = environment.API_URL
var doc1;
@Component({
  selector: 'app-docpopover3',
  templateUrl: './docpopover3.component.html',
  styleUrls: ['./docpopover3.component.scss'],
})
export class Docpopover3Component implements OnInit {
API_URL = API_URL
  currentdoc: any = []
  doc: any;
  url: string;
 document_id: any;
 user_id: any;
 directory: any ;
  status: any;
  constructor(private alert: AlertController,private modalCtrl: ModalController,private user: UserServiceService,private popover: PopoverController,private http: HttpClient, public toastController: ToastController, private router: Router, private navParams: NavParams) {


    this.document_id = this.navParams.get('document');
    this.user_id = this.navParams.get('user');
    this.directory = this.navParams.get('directory');
    this.status = this.navParams.get('status');
    this.getdocument()
 
   }





  ngOnInit() {
    this.doc = this.navParams.get('document');
    doc1 = this.doc;
    console.log(doc1);
  }
 
  

  async download_doc() {
    this.doc = this.navParams.get('document');
    
    console.log(this.doc)
   



    
    const formData: FormData = new FormData();
    formData.append('doc_id', this.doc)
    this.http.get(API_URL+"admin/download_doc?doc_id="+this.doc).subscribe((response: any) => {
      console.log(response);
    
      
      
     
    }
    )
    





    


  }

  async view(){
    
  
      const modal = await this.modalCtrl.create({
        component: ViewmodalPage,
        componentProps:{
          file: API_URL+this.currentdoc.directory+'/'+this.currentdoc.filename

        },
        cssClass: 'viewmodal'
        
      

      });
      
      await modal.present();
      await modal.onDidDismiss().then(()=>{
          this.popover.dismiss()



      })
     
         
      
    


  }
  async delalert(){
    console.log()
  const alert = await this.alert.create({
   
    header: "",
    subHeader: "",
    message: "Are you sure?",
    buttons: ['Cancel', {
  
      text: 'Delete',
      handler: ()=>{
        
        this.deletedoc()
        alert.dismiss()
      }
  
    }],
  });
  await alert.present();
  alert.onWillDismiss().then(()=>{
      this.popover.dismiss()


  })
  
  }

  deletedoc(){


    const formData: FormData = new FormData();
    formData.append('doc_id', this.doc)
    

    this.http.post(API_URL+"admin/deletedoc", formData).subscribe((response: any) => {
      console.log(response);
    
      
      
     
    }
    )

  
}


  getdocument(){
        this.user.get(API_URL+"admin/getdocument?doc_id="+this.document_id).subscribe((res)=>{

                this.currentdoc = res[0]
                console.log(this.currentdoc)
 


        })



  }

  
  async addbranch(){
    
    const modal = await this.modalCtrl.create({
      component: AddBranchPage,
     componentProps: {
      document : this.document_id,
      user: this.user_id,
      directory: this.directory,
      status: this.status


     }
    

    });
    
    await modal.present();
    await modal.onDidDismiss();
    this.popover.dismiss();

       
    
  }


  
  async viewbranch(){
    const modal = await this.modalCtrl.create({
      component: ViewBranchPage,
     
    

    });
    
    await modal.present();
    await modal.onDidDismiss();

       
    
  }
}
