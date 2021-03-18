import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/Storage'
const TOKEN_KEY = 'auth-token'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [StatusBar, SplashScreen]  
})
export class AppComponent {
  
  constructor(
    private authService: AuthenticationService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,
   
    private router: Router
 
    ) {
    this.initializeApp();

    // this.storage.get(TOKEN_KEY).then((res)=>{
    //   if(res){
    //     this.authService.notloggedin.next(false);

    //   }

    // })
  }

  initializeApp(){
   this.platform.ready().then(()=>{
      
      this.authService.checkToken();
   })

  }
}
