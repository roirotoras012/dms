import { Component, OnInit } from '@angular/core';


import { ToastController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Router } from '@angular/router';
import { PopoverController, ModalController } from '@ionic/angular';
import { UserServiceService } from '../../services/user-service.service';
import { AddBranchPage } from '../add-branch/add-branch.page';
import { ViewBranchPage } from '../view-branch/view-branch.page';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { ArgumentType } from '@angular/compiler/src/core';
@Component({
  selector: 'app-viewmodal',
  templateUrl: './viewmodal.page.html',
  styleUrls: ['./viewmodal.page.scss'],
})
export class ViewmodalPage implements OnInit {
  file: any
  pdfSrc: any
  constructor(private DomSanitizer: DomSanitizer,private modalCtrl: ModalController,private user: UserServiceService,private popover: PopoverController,private http: HttpClient, public toastController: ToastController, private router: Router, private navParams: NavParams) { 





    this.file = this.navParams.get('file');


    this.pdfSrc = this.DomSanitizer.bypassSecurityTrustResourceUrl(this.file)
    console.log(this.file)


  }

  ngOnInit() {
  }

}
