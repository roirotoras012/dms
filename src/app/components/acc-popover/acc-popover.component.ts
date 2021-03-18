import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/Storage'
import { AuthenticationService } from '../../services/authentication.service';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-acc-popover',
  templateUrl: './acc-popover.component.html',
  styleUrls: ['./acc-popover.component.scss'],
})
export class AccPopoverComponent implements OnInit {

  constructor(private router:Router, private platform: Platform,private storage: Storage,private authService: AuthenticationService, private popover: PopoverController) { }

  ngOnInit() {}
  async logout() {
    
    this.authService.logout();
    this.platform.ready().then(()=>{
          
      this.authService.authenticationState.subscribe((state)=>{
        console.log(state);
        if(state){
          
          this.router.navigate(['','admin'])
        }else{
            this.router.navigate(['login'])
        }

      })
      this.authService.notloggedin.subscribe((state)=>{
        console.log(state);
        

      })

   })
  
    await this.popover.dismiss();
  }
}
