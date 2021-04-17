import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Router } from '@angular/router';
import { PopoverController, ModalController } from '@ionic/angular';
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
  doc: any;
  url: string;
 document_id: any;
 user_id: any;
 directory: any ;
  status: any;
  constructor(private modalCtrl: ModalController,private user: UserServiceService,private popover: PopoverController,private http: HttpClient, public toastController: ToastController, private router: Router, private navParams: NavParams) {


    this.document_id = this.navParams.get('document');
    this.user_id = this.navParams.get('user');
    this.directory = this.navParams.get('directory');
    this.status = this.navParams.get('status');


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



}
