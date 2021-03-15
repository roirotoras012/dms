import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DocumentsPipe } from './documents.pipe';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [AppComponent, DocumentsPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  PreviewAnyFile],
  bootstrap: [AppComponent],
})
export class AppModule {}
