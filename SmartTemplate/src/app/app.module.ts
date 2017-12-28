import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedLibsModule } from './shared';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  FooterComponent,
  NavbarComponent,
  MainComponent,
  CustomMaterialComponent
} from './layout';

import { AdminComponent } from './admin/admin.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { HomeService } from './dynamic-form/service/dynamic-form.service';

import { ScrollSpyDirective } from './layout/directives';

import { APP_ROUTE } from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTE, { useHash: true }),
    NgbModule.forRoot(),
    HttpClientModule,
    SharedLibsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    MainComponent,
    DynamicFormComponent,
    AdminComponent,
    ScrollSpyDirective,
    CustomMaterialComponent
  ],
  providers: [
    HomeService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ MainComponent ]
})
export class AppModule { }
