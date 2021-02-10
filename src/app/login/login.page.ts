import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ApiServiceService } from './../api-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 username: string;
 password: string;


  constructor(public api: ApiServiceService, private http: HttpClient) { }
 
  ngOnInit() {
  }
  async add_account() {
    
    let postData = {
      username: this.username,
      password: this.password,
      name: "asdasd"
      
}
    this.http.post("https://localhost/dms/admin/add_account", JSON.stringify(postData)) 
      .subscribe(res => {
        console.log(res);
      
  }, err => {
    console.log(err);
  });




  }
  }
