import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToastController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  checked_users: any = []
  postData : any = []
  constructor(private modalCtrl: ModalController, private http: HttpClient, public toastController: ToastController, private router: Router, private navParams: NavParams) { }
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  ngOnInit() {
   
    
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'User has been successfully deleted',
      duration: 2000
    });
    toast.present();
  }
  
  async deleteUser() {
    
      this.checked_users = this.navParams.get('checked_users');
      
      this.checked_users.map(obj => {
        this.postData.push(obj.user_id);
      });
      
      if(this.checked_users.length > 0 ){
        this.presentToast();
        

      }



      this.http.post("https://localhost/dms/admin/removeuser", JSON.stringify(this.postData )) 
        .subscribe(res => {
         
          console.log(res);
          this.modalCtrl.dismiss();
          
          
        
        
    }, err => {
      console.log(err);
    });





      


    }
}
