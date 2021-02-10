import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private http: HttpClient, private router: Router) { }
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  ngOnInit() {}

}
