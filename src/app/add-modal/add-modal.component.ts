import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

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
  constructor(private modalCtrl: ModalController, private http: HttpClient, private router: Router) { }

  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  
  ngOnInit() {}
  ionViewWillLeave() {
    
  }
  

  async add_account() {

    
    
    let postData = {
      username: this.username,
      password: this.password,
      name: this.name,
      email: this.email,
      usertype: this.usertype,
      department_id: this.department
      
      
}
    this.http.post("https://localhost/dms/admin/add_account", JSON.stringify(postData)) 
      .subscribe(res => {
        console.log(res);
        this.modalCtrl.dismiss();
        this.router.navigateByUrl('admin', {skipLocationChange: true}).then(()=>
     this.router.navigate(['../manage-users'])
);
      
  }, err => {
    console.log(err);
  });




  }





}
