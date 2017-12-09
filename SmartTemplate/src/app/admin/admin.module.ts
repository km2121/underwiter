import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent, ADMIN_ROUTE } from './';

@NgModule({
    imports: [
        RouterModule.forRoot([ ADMIN_ROUTE ], { useHash: true })
    ],
    declarations: [
        AdminComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AdminModule {}
