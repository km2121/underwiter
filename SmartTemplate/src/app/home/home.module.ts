import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { SharedLibsModule } from '../shared';

@NgModule({
    imports: [
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true }),
        SharedLibsModule
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class HomeModule {}
