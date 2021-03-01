import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { AccPopoverComponent } from '../../components/acc-popover/acc-popover.component';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ToastController, NavParams } from '@ionic/angular';
declare var myFunction;

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
 username: string;
 file_upload: File;
 fileinput: any;
  constructor(private popover: PopoverController, private http: HttpClient,public toastController: ToastController) { }

  ngOnInit() {
  }
  selectedFile(event){
    this.file_upload = event.target.files[0];
   
  }

  async onClick(){
    console.log(this.file_upload);
    const toast = await this.toastController.create({
      message: 'Successfully Uploaded the file',
      duration: 2000
    });
    
    const formData: FormData = new FormData();
    formData.append('document', this.file_upload, this.file_upload.name)
    this.http.post("https://localhost/dms/upload_controller/do_upload",formData).subscribe((response: any) => {
      console.log(response  );
      toast.present();
      this.fileinput = null
    }
    )
    

  }



  async _popOver(ev:any){
    const popover = await this.popover.create({
      component: PopoverComponent,
      event: ev
    })
    return await popover.present()
  }

  async acc_popover(ev:any){
    const popover = await this.popover.create({
      component: AccPopoverComponent,
      event: ev
    })
    return await popover.present()
  }
}
