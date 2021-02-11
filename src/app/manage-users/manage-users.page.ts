import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Router } from '@angular/router';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { Delete1ModalComponent } from '../delete1-modal/delete1-modal.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {
  datauser: any = [];
  isIndeterminate:boolean;
  masterCheck:boolean;
  checkedUsers: any = [];
  constructor(private modalCtrl: ModalController, private http: HttpClient, private router: Router) { 

    



    
    
  }
  


    async openadd(){
      const modal = await this.modalCtrl.create({
        component: AddModalComponent,
       
      

      });
      
      await modal.present();
         
      
    }

    async openedit(data){
      const modal1 = await this.modalCtrl.create({
        component: EditModalComponent,
        componentProps: {
          data : data
          


        }
      

      });
      
      await modal1.present();
       
    }
    
    async opendelete(){
      this.checkedUsers = []
      this.datauser.map(obj => {
        if (obj.isChecked) {
          this.checkedUsers.push(obj);
          
        };
      });
      
      const modal2 = await this.modalCtrl.create({
        component: DeleteModalComponent,
        cssClass: "my-modal",
        componentProps: {
          checked_users: this.checkedUsers


        }
        
       
      

      });
      
      await modal2.present();
         
    }

    async opendelete1(x){
      
      
      const modal3 = await this.modalCtrl.create({
        component: Delete1ModalComponent,
        
        componentProps: {
          tobedeleted : x
          


        }
        
       
      

      });
     
      
      await modal3.present();
         
    }

  ngOnInit() {

  
   
  }
  ionViewWillEnter(){
    this.getUsers();

  }

  async getUsers() {
 
    this.http.get("https://localhost/dms/admin/getuser") 
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
      if (obj.isChecked) {checked++
        
      
      };
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
