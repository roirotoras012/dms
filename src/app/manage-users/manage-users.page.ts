import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Router } from '@angular/router';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {
  datauser: any = [];
  isIndeterminate:boolean;
  masterCheck:boolean;
  
  constructor(private modalCtrl: ModalController, private http: HttpClient, private router: Router) { 

    



    
    
  }
  


    async openadd(){
      const modal = await this.modalCtrl.create({
        component: AddModalComponent,
       
      

      });
      
      await modal.present();
         
      
    }

    async openedit(){
      const modal1 = await this.modalCtrl.create({
        component: EditModalComponent,
       
      

      });
      
      await modal1.present();
         
    }
    
    async opendelete(){
      const modal2 = await this.modalCtrl.create({
        component: DeleteModalComponent,
       
      

      });
      
      await modal2.present();
         
    }

  ngOnInit() {

  
   
  }
  ionViewWillEnter(){
    this.getUsers();

  }

  async getUsers() {
 
    this.http.get("https://localhost/dms/admin/test") 
      .subscribe(res => {
        console.log(res);
        this.datauser = res;
    console.log(this.datauser);
 
    
        }
      
      , err => {
        console.log(err);
      });


     


  }









  




  checkMaster() {
    setTimeout(()=>{
      this.datauser.forEach(obj => {
        obj.isChecked = this.masterCheck;
      });
    });
  }

  checkEvent() {
    const totalItems = this.datauser.length;
    let checked = 0;
    this.datauser.map(obj => {
      if (obj.isChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }
}
