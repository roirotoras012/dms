import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { PopoverController, AlertController, ModalController } from '@ionic/angular';


import { Storage } from '@ionic/Storage'
import { UserServiceService } from '../../services/user-service.service';
import { ArgumentType } from '@angular/compiler/src/core';
import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core'
import { environment } from '../../../environments/environment';
const API_URL = environment.API_URL
@Component({
  selector: 'app-historymodal',
  templateUrl: './historymodal.page.html',
  styleUrls: ['./historymodal.page.scss'],
})
export class HistorymodalPage implements OnInit {
  audit: any = []
  auditplan: any = []
  constructor(private modalCtrl: ModalController,private platform: Platform,@Inject(LOCALE_ID) private locale: string,private alert: AlertController,private userservice: UserServiceService,private popover: PopoverController, private http: HttpClient,private storage: Storage) { 


      this.getauditplan()


  }

  ngOnInit() {
  }


  getauditplan(){
    this.userservice.get(API_URL+"admin/generate1").subscribe((res)=>{
      console.log(res)
        this.auditplan = res
        for(let i=0 ; i < this.auditplan.length; i++){
          let date = new Date(this.auditplan[i].date_generated).toString().slice(0,21) 
          date = formatDate(date, 'medium', this.locale);
     
          this.auditplan[i].date_generated = date
      
  
          
  
      }
      this.getaudit()
          console.log(this.auditplan)
       
      
  
    }
    )
  
  }
  get sortData1(){
    return this.auditplan.sort((a, b) => {
      return <any>new Date(a.date_generated) - <any>new Date(b.date_generated);
    });
  }



  get sortData(){
    return this.audit.sort((a, b) => {
      return <any>new Date(a.startTime) - <any>new Date(b.startTime);
    });
  }
  getaudit(){


  this.userservice.get(API_URL+"admin/getaudit").subscribe((res)=>{

      this.audit = res
      for(let i=0 ; i < this.audit.length; i++){
        let starTime = new Date(this.audit[i].startTime).toString().slice(0,21) 
        starTime = formatDate(starTime, 'medium', this.locale);
        let endTime= new Date(this.audit[i].endTime).toString().slice(0,21)
        endTime = formatDate(endTime, 'medium', this.locale);
        this.audit[i].startTime = starTime
        this.audit[i].endTime = endTime

     
       

    }
  console.log(this.audit)
        
     

  })

  



  }









}
