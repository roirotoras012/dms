import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ToastController, NavParams } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../services/user-service.service'
 
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})
export class EditModalPage implements OnInit {

  datauser: any = [];
  usertobeedited: any = []
  username: string;
  password: string;
  name: string;
  email: string;
  usertype: string;
  department: string;
  usertypes: any = []
  usertype1: any;
  user_level: any;
  
  constructor(private user: UserServiceService,private modalCtrl: ModalController, private http: HttpClient, private router: Router,public toastController: ToastController,  private navParams: NavParams) { 

this.getusertype()



  }
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  ngOnInit() { this.getUser()}

  
  getusertype(){

    this.user.get("https://localhost/dms/admin/getusertype").subscribe((res)=>{
    this.usertypes = res
      console.log(this.usertypes)


    })


}

  async getUser() {
 
    // this.http.get("https://localhost/dms/admin/getuser") 
    //   .subscribe(res => {
    //     console.log(res);
    //     this.datauser = res;
    // console.log(this.datauser);
 
    
    //     }
      
    //   , err => {
    //     console.log(err);
    //   });
   
    this.usertobeedited = this.navParams.get('data');
    console.log(this.usertobeedited)
    this.username = this.usertobeedited.username;
    this.email = this.usertobeedited.email;
    this.name = this.usertobeedited.name;
    



  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'User has been successfully updated',
      duration: 2000
    });
    toast.present();
  }

  async edit_account() {
 
    if(this.user_level == null){

      this.user_level = ''
    }

    if(this.usertype1 != 'auditee'){

        this.usertype = this.usertype1

    }
    if(this.username && this.password && this.name &&  this.email &&  this.usertype != null){
      const formData: FormData = new FormData();
      formData.append('username', this.username)
      formData.append('password', this.password)
      formData.append('usertype', this.usertype)
      formData.append('email', this.email)
      
      formData.append('user_level', this.user_level)
      formData.append('name', this.name)
      formData.append('user_id', this.usertobeedited.user_id)
      
    
  const usernametaken = await this.toastController.create({
    message: 'Username is already taken',
    duration: 2000
  });
      this.http.post("https://localhost/dms/admin/edit_user", formData) 
        .subscribe(res => {
         
          console.log(res);
          if(res == "username is already taken"){
           
            usernametaken.present()
          }else{
            this.modalCtrl.dismiss();
          
            this.presentToast();
          
            
          }
          
        
    }, err => {
      console.log(err);
    });
  
  
  
  
    }else{
      const toast = await this.toastController.create({
        message: 'Invalid Entries',
        duration: 2000
      });
      toast.present();
      

    }


  }

}
