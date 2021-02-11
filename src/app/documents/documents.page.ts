import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
 username: string;
  constructor() { }

  ngOnInit() {
  }


  async edit_account(){

    console.log(this.username)

  }
}
