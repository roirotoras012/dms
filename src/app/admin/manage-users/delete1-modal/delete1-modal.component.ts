import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
const API_URL = environment.API_URL

@Component({
  selector: 'app-delete1-modal',
  templateUrl: './delete1-modal.component.html',
  styleUrls: ['./delete1-modal.component.scss'],
})
export class Delete1ModalComponent implements OnInit {
  tobedeleted: any;
  constructor(private modalCtrl: ModalController, private http: HttpClient, public toastController: ToastController, private router: Router, private navParams: NavParams) { }

  ngOnInit() {}

  dismissModal(){
    this.modalCtrl.dismiss();
   
  }

  async deleteUser() {
    this.tobedeleted = this.navParams.get('tobedeleted');

    


    this.http.post(API_URL+"admin/removeuser1", JSON.stringify(this.tobedeleted )) 
      .subscribe(res => {
       
        console.log(res);
        this.modalCtrl.dismiss();
        
        
       
   
      
  }, err => {
    console.log(err);
  });





    


  }

}
