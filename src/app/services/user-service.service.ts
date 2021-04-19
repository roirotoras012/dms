import { Injectable } from '@angular/core';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { AccPopoverComponent } from '../components/acc-popover/acc-popover.component';

import { Storage } from '@ionic/Storage'
const TOKEN_KEY = 'auth-token'
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  user: any;

  constructor( private popover: PopoverController, private http: HttpClient,private storage: Storage) 
  { 
   
  }





userinfo() {
   return this.storage.get(TOKEN_KEY)
  
    

  


}

get(server){
  return this.http.get(server)


}
post(server,data){
  return this.http.post(server,data)


}


}
