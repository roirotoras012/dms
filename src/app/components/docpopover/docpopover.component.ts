import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Router } from '@angular/router';
var doc1;
@Component({
  selector: 'app-docpopover',
  templateUrl: './docpopover.component.html',
  styleUrls: ['./docpopover.component.scss'],
})
export class DocpopoverComponent implements OnInit {
  doc: any;
  url: string;
 
  constructor(private http: HttpClient, public toastController: ToastController, private router: Router, private navParams: NavParams) { }

  ngOnInit() {
    this.doc = this.navParams.get('document');
    doc1 = this.doc;
    console.log(doc1);
  }
 
  

  async download_doc() {
    this.doc = this.navParams.get('document');
    
    console.log(this.doc)
   



    
    const formData: FormData = new FormData();
    formData.append('doc_id', this.doc)
    this.http.get("https://localhost/dms/admin/download_doc?doc_id="+this.doc).subscribe((response: any) => {
      console.log(response);
    
      
      
     
    }
    )
    





    


  }

}
