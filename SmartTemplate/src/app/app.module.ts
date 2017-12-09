import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  FooterComponent,
  NavbarComponent,
  MainComponent
 } from './layout';

 import { LayoutRoutingModule } from './layout/layout-routing.module';

 import { AdminModule } from './admin/admin.module';
 import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    LayoutRoutingModule,
    AdminModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
