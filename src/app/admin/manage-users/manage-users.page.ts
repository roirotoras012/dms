import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddModalComponent } from './add-modal/add-modal.component';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Router } from '@angular/router';
import { EditModalPage } from './edit-modal/edit-modal.page';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { Delete1ModalComponent } from './delete1-modal/delete1-modal.component';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { AccPopoverComponent } from '../../components/acc-popover/acc-popover.component';
import { UserServiceService } from '../../services/user-service.service';
declare var myFunction;

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {
  currentuser: any = [];
  datauser: any = [];
  isIndeterminate:boolean;
  masterCheck:boolean;
  checkedUsers: any = [];
  sortDirection = 0 
  sortKey = null
  constructor(private userservice: UserServiceService,private modalCtrl: ModalController, private http: HttpClient, private router: Router, private popover: PopoverController) { 

    
    this.getuserinfo();


    
    
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
  sortBy(key){
    this.sortKey = key;
    this.sortDirection++;
    this.sort();

  }
  sort(){
    if(this.sortDirection == 1){
        this.datauser = this.datauser.sort((a, b  )=>{
          const valA = a[this.sortKey];
          const valB = b[this.sortKey];
          return valA.localeCompare(valB);

        });
    }else if(this.sortDirection==2){
      this.datauser = this.datauser.sort((a, b  )=>{
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valB.localeCompare(valA);

      });

    }else{
      this.sortDirection = 0 ;
      this.sortKey = null;
    }

  }


    async openadd(){
      const modal = await this.modalCtrl.create({
        component: AddModalComponent,
       
      

      });
      
      await modal.present();
      await modal.onDidDismiss();
      this.getUsers()
         
      
    }

    async openedit(data){
      const modal1 = await this.modalCtrl.create({
        component: EditModalPage,
        componentProps: {
          data : data
          


        }
      

      });
      
      await modal1.present();
      await modal1.onDidDismiss();
      this.getUsers()
         
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
      await modal2.onDidDismiss();
      this.getUsers()
    }

    async opendelete1(x){
      
      
      const modal3 = await this.modalCtrl.create({
        component: Delete1ModalComponent,
        
        componentProps: {
          tobedeleted : x
          


        }
        
       
      

      });
     
      
      await modal3.present();
      await modal3  .onDidDismiss();
      this.getUsers()  
    }

  ngOnInit() {

  
   
  }
  ionViewWillEnter(){
    this.getUsers();

  }

  async getUsers() {
 
    this.http.get("https://localhost/dms/admin/getuser") 
      .subscribe(res => {
      
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
