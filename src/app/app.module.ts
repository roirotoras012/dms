import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DocumentsPipe } from './documents.pipe';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({ 
  declarations: [AppComponent, DocumentsPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},{provide : LocationStrategy , useClass: HashLocationStrategy},
  PreviewAnyFile],
  
  bootstrap: [AppComponent],
})
export class AppModule {} 
