import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, of } from 'rxjs';
import { LoginPage } from '../login/login.page';
import { Storage } from '@ionic/Storage'
import { Router } from '@angular/router';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  usertype: string;
  authenticationState = new BehaviorSubject(false);
  AdminState = new BehaviorSubject(false);
  DepartmentalState = new BehaviorSubject(false);
  AuditorState = new BehaviorSubject(false);
  notloggedin = new BehaviorSubject(true);
  constructor(private storage: Storage, private plt: Platform, private router: Router) { 
      this.plt.ready().then(()=>[
        this.checkToken()
      ])
  }

  login(data){
    return this.storage.set(TOKEN_KEY, data).then(()=>{
      this.authenticationState.next(true);
      this.notloggedin.next(false);
     
          if(data.usertype == "admin"){
            
            this.AdminState.next(true);
          }
        
         else if(data.usertype == "auditor"){
            
            this.AuditorState.next(true);
          }
          else{
            
            this.DepartmentalState.next(true);
          }
      this.storage.get(TOKEN_KEY).then((res)=>{
        if(res){
          
          console.log(res);
  
        }
  
      })
      
    });
  
  }
  logout(){
    return this.storage.remove(TOKEN_KEY).then(()=>{
      this.authenticationState.next(false);
      this.notloggedin.next(true);
      this.AdminState.next(false);
      this.DepartmentalState.next(false);
      this.AuditorState.next(false);
      
    }).then(()=>{
      this.router.navigate(['login'])


    })
    
  }
  isAuthenticated(){
    return this.authenticationState.value;
    
  } 
  isnotAuthenticated(){
    return this.notloggedin.value;
    
  }
  
  AdminAuthenticated(){
    return this.AdminState.value;

  }
  DepartmentalsAuthenticated(){
    return this.DepartmentalState.value;

    
  }
  AuditorAuthenticated(){
    return this.AuditorState.value;

    
  }
  checkToken(){
    return this.storage.get(TOKEN_KEY).then((res)=>{
      if(res){
        
        this.authenticationState.next(true);
        this.notloggedin.next(false);
        this.storage.get(TOKEN_KEY).then((res)=>{
          if(res){
            
            if(res.usertype == "admin"){
            
              this.AdminState.next(true);
            }
           
            else if(res.usertype == "auditor"){
              
              this.AuditorState.next(true);
            } 
            else{
              
              this.DepartmentalState.next(true);
            }
    
          }
    
        })

        
         
      }

    })
    
  } 
}


