import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Router } from '@angular/router';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { UserServiceService } from '../../services/user-service.service';
import { AddBranchPage } from '../add-branch/add-branch.page';
import { ViewBranchPage } from '../view-branch/view-branch.page';
import { ArgumentType } from '@angular/compiler/src/core';

var doc1;
@Component({
  selector: 'app-docpopover',
  templateUrl: './docpopover.component.html',
  styleUrls: ['./docpopover.component.scss'],
})
export class DocpopoverComponent implements OnInit {
  currentuser: any
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
    this.getuserinfo()

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
    this.http.get("https://localhost/dms/admin/download_doc?doc_id="+this.doc).subscribe((response: any) => {
      console.log(response);
    
      
      
     
    }
    )
    





    


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

  getuserinfo(){
  
    this.user.userinfo().then((data)=>{
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
    
    formData.append('usertype_title', this.currentuser.usertype_title)
    this.http.post("https://localhost/dms/admin/deletedoc", formData).subscribe((response: any) => {
      console.log(response);
    
      
      
     
    }
    )

  
}


}
