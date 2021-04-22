import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToastController, NavParams } from '@ionic/angular';
import { UserServiceService } from '../../../services/user-service.service'
import { environment } from '../../../../environments/environment';
const API_URL = environment.API_URL
@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  username: string;
  password: string;
  name: string;
  email: string;
  usertype: string;
  department: string;
  usertypes: any = []
  usertype1: any;
  user_level: any;
  constructor(private user: UserServiceService,private modalCtrl: ModalController, private http: HttpClient, private router: Router , public toastController: ToastController, private navParams: NavParams) { 

    this.getusertype()



  }

  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  
  ngOnInit() {


  }
  ionViewWillLeave() {
    
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'User has been successfully added',
      duration: 2000
    });
    toast.present();
  }

  getusertype(){

      this.user.get(API_URL+"admin/getusertype").subscribe((res)=>{
      this.usertypes = res
     


      })


  }

  async add_account() {
   
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


  const usernametaken = await this.toastController.create({
    message: 'Username is already taken',
    duration: 2000
  });
      this.http.post(API_URL+"admin/add_account", formData) 
        .subscribe(res => {
         
      

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
