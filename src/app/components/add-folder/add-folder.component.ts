import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ToastController, NavParams } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
const API_URL = environment.API_URL
@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss'],
})
export class AddFolderComponent implements OnInit {
  fol: any= [];
  foldername: string;
  constructor(private modalCtrl: ModalController, private http: HttpClient, private router: Router,public toastController: ToastController,  private navParams: NavParams) { 
    this.fol = this.navParams.get('data');
  }

  ngOnInit() {}
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }


 async add_folder(){
  // this.fol = this.navParams.get('data');
  const formData: FormData = new FormData();
  formData.append('foldername', this.foldername)
  formData.append('dir', this.fol.dir)
  // formData.append('currfolder', this.fol.currfolder)
  // formData.append('department', this.fol.department)
  // formData.append('parent_folder', this.fol.parent_folder)
  // formData.append('parent_path', this.fol.parent_path)

  
 
    
 
  
  this.http.post(API_URL+"admin/addfolder", formData) 
  .subscribe(res => {
    console.log(res)
   if(res == "success"){

    this.modalCtrl.dismiss({
      'dismissed': true
    });;
   }
   if(res == "exists"){
    

   }
    
    
  
}, err => {
console.log(err);
});
 }
}
