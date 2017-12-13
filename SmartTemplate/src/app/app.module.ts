import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedLibsModule } from './shared';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  FooterComponent,
  NavbarComponent,
  MainComponent
} from './layout';

import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';

import { APP_ROUTE } from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTE, { useHash: true }),
    NgbModule.forRoot(),
    HttpModule,
    SharedLibsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    MainComponent,
    HomeComponent,
    AdminComponent
  ],
  providers: [
    HomeService
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
