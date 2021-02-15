import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import WebViewer from '@pdftron/webviewer';
declare var myFunction;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
 @ViewChild('viewer') viewerRef: ElementRef;
  constructor(public previewAnyFile: PreviewAnyFile) { }

  ngAfterViewInit(){
    WebViewer({
      path: '../assets/lib',
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'

    }, this.viewerRef.nativeElement).then(instance=> {

    });

  }


  ngOnInit() {
    
    
  }
  PreviewPDfFile(){

    var url = "C:\Users\PERSONAL\Desktop\SS\ASSIGNMENT 02_ PERSONALITY TEST.docx";
    this.previewAnyFile.preview(url).then(()=> {


    },(err)=>{
alert(JSON.stringify(err));

    } )
  }

}
