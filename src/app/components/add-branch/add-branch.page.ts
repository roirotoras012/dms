import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { UserServiceService } from '../../services/user-service.service';
import { ToastController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.page.html',
  styleUrls: ['./add-branch.page.scss'],
})
export class AddBranchPage implements OnInit {
  document_id: any;
  user_id: any;
  directory: any;
  file_upload: File;
  fileinput: any;
  file_upload1: File;
  fileinput1: any;
  status: any;
  branches: any = []

  constructor(private alert: AlertController,private http: HttpClient,private modal: ModalController,private popover: PopoverController, private user: UserServiceService, private toast: ToastController, private navParams: NavParams) {
    this.document_id = this.navParams.get('document');
    this.user_id = this.navParams.get('user');
    this.directory = this.navParams.get('directory');
    this.status = this.navParams.get('status');
    console.log(this.document_id)
    this.getbranch()
   }

  ngOnInit() {
  }

  selectedFile(event){
    this.file_upload = event.target.files[0];
   
  }
  selectedFile1(event){
    this.file_upload1 = event.target.files[0];
   
  }
  dismissModal(){
    this.modal.dismiss();
   
  }
async alert1(data){
    console.log(data)
  const alert = await this.alert.create({
   
    header: "",
    subHeader: "",
    message: "Are you sure?",
    buttons: ['Cancel', {
 
      text: 'Proceed',
      handler: ()=>{
        
        this.main(data)
 
      }
 
    }],
  });
  alert.present();
}
 async main(x){
    console.log(x)

    const toast = await this.toast.create({
      message: 'Successfully Uploaded the file',
      duration: 2000
    });
    
    const formData: FormData = new FormData();
    formData.append('branch_document_id', x.branch_document_id)
    formData.append('branch_document_type', x.branch_document_type)
    formData.append('branch_document_filename', x.branch_document_filename)
    formData.append('branch_document_filetype', x.branch_document_filetype)
    formData.append('branch_document_user', x.branch_document_user)
    formData.append('branch_document_main', x.branch_document_main)
    formData.append('branch_document_directory', x.branch_document_directory)
   
    formData.append('current_main', x.branch_document_main)
    this.http.post("https://localhost/dms/admin/mainswap",formData).subscribe((response: any) => {
      console.log(response);
if(response == 'success'){  
  this.dismissModal()

}
    
     
    }
    )
    
      
    this.getbranch()


    

  }
  


  async onClick(){
    if(this.file_upload){
      const formData: FormData = new FormData();
      formData.append('document', this.file_upload, this.file_upload.name)
    formData.append('directory', this.directory)
    formData.append('document_id', this.document_id)
    formData.append('doc_type', this.status)
    formData.append('user', this.user_id)
      this.http.post("https://localhost/dms/upload_controller/do_uploadB",formData).subscribe((response: any) => {
        console.log(response);
  
        if(response == 'success'){
         
          this.getbranch()
          
          toast.present();
          this.fileinput = null
        }
        else if(response == 'filename already exist'){
          console.log(response)
          this.fileinput = null
        }
        else if(response == 'failed'){
  
          console.log(response)
          this.fileinput = null
        }
    
        
      

      }
      )


    }
    const toast = await this.toast.create({
      message: 'Successfully Uploaded the file',
      duration: 2000
    });
    
    
    
   
  }


  getbranch(){
    this.http.get("https://localhost/dms/admin/getbranches?doc_id="+this.document_id).subscribe((res)=>{
          this.branches = res
          console.log(res)


    })


  }


  async update(x){
    console.log(this.file_upload1);

    if(this.file_upload1){
      const toast = await this.toast.create({
        message: 'Successfully Uploaded the file',
        duration: 2000
      });
      
      const formData: FormData = new FormData();
      formData.append('document', this.file_upload1, this.file_upload1.name)
    formData.append('branch_document_directory', x.branch_document_directory)
    formData.append('branch_document_id', x.branch_document_id)
    formData.append('branch_document_type', x.branch_document_type)
    formData.append('branch_document_user', this.user_id)
    formData.append('branch_document_main', x.branch_document_main)
    formData.append('old_file', x.branch_document_filename)
      this.http.post("https://localhost/dms/upload_controller/do_uploadBB",formData).subscribe((response: any) => {
        console.log(response);
  if(response == 'success'){
    
    this.getbranch()
  
 
  toast.present();
  this.fileinput1 = null

  }
      
       
      }
      )
      
        
      this.getbranch()

    }
   
    

  }

 

}
