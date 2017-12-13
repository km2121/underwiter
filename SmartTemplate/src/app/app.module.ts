import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedLibsModule } from './shared';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {
  FooterComponent,
  NavbarComponent,
  MainComponent
} from './layout';

import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';

import { APP_ROUTE } from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTE, {useHash: true}),
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
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
