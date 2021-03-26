import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ApiServiceService } from './../api-service.service';
import { Storage } from '@ionic/Storage'
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController, NavParams } from '@ionic/angular';
const TOKEN_KEY = 'auth-token'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 username: string;
 password: string;
 usertype: string;

 
  constructor(private toastController: ToastController,private platform: Platform,private router: Router,public api: ApiServiceService, private http: HttpClient,private storage: Storage,private authService: AuthenticationService) { 

      // console.log(authService.isnotAuthenticated())
      // this.storage.get(TOKEN_KEY).then((res)=>{
      //   if(res){
          
      //   if(res.usertype == "admin"){
      //     this.router.navigate(['','admin'])

      //   }
      //   if(res.usertype == "auditor"){
      //     this.router.navigate(['','auditor'])

      //   }
      //   if(res.usertype == "department"){
      //     this.router.navigate(['','department'])

      //   }
  
      //   }
  
      // })
    
    
  }
  ionViewWillEnter(){
    

    
    this.storage.get(TOKEN_KEY).then((res)=>{
      if(res){
        
      if(res.usertype == "admin"){
        this.router.navigate(['','admin'])

      }
      if(res.usertype == "auditor"){
        this.router.navigate(['','auditor'])

      }
      if(res.usertype == "department"){
        this.router.navigate(['','department'])

      }

      }

    })
  }
  ngOnInit() {
  }
  
    
  
  async login_acc() {
    const toast = await this.toastController.create({
      message: 'Invalid Credentials',
      duration: 2000
    });
    const errortoast = await this.toastController.create({
      message: 'Error, Pleas Check your connection',
      duration: 2000
    });
   

    const formData: FormData = new FormData();
    formData.append('username', this.username)
    formData.append('password', this.password)
    formData.append('usertype', this.usertype)
    
    this.http.post("https://localhost/dms/admin/login",formData).subscribe((response: any) => {
      
      if(response == "error"){
        toast.present();
      }
      else{
        let data = {
          user_id: response[0].user_id,
          usertype: this.usertype,
          department: response[0].department_id
        };
      
      
        this.authService.login(data);  
        this.platform.ready().then(()=>{
          
            this.authService.authenticationState.subscribe((state)=>{
              
              if(state){
                this.storage.get(TOKEN_KEY).then((res)=>{
                  if(res){
                    
                  if(res.usertype == "admin"){
                    this.router.navigate(['','admin'])

                  }
                  if(res.usertype == "auditor"){
                    this.router.navigate(['','auditor'])

                  }
                  if(res.usertype == "department"){
                    
                    this.router.navigate(['','department'])

                  }
            
                  }
            
                })
              
              }
           
      
            })
            
      
         })
      }
      
      
      
    }, (error) => {
      console.log("Catch error ", error)
      errortoast.present();
    }
    )
    this.username = '';
    this.password = '';
    


    
  }
  }
