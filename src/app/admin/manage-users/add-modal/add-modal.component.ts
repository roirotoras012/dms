import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToastController, NavParams } from '@ionic/angular';

 
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
  constructor(private modalCtrl: ModalController, private http: HttpClient, private router: Router , public toastController: ToastController, private navParams: NavParams) { }

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

  async add_account() {
    if(this.usertype == "admin"){

     
    }
    
    if(this.username && this.password && this.name &&  this.email &&  this.usertype &&  this.department != null){
      
      const formData: FormData = new FormData();
      formData.append('username', this.username)
      formData.append('password', this.password)
      formData.append('usertype', this.usertype)
      formData.append('email', this.email)
      
      formData.append('department', this.department)
      formData.append('name', this.name)
      let postData = {
        username: this.username,
        password: this.password,
        name: this.name,
        email: this.email,
        usertype: this.usertype,
        department_id: this.department
        
        
  }
      this.http.post("https://localhost/dms/admin/add_account", formData) 
        .subscribe(res => {
         
          console.log(res);
          this.modalCtrl.dismiss();
          
           this.presentToast();
         
           this.router.navigateByUrl('admin', {skipLocationChange: true}).then(()=>
       
       
          this.router.navigate(['../admin/manage-users'])
      
       
  
  
  
  
  );
        
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
