import { Route } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';

export const APP_ROUTE: Route[] = [
    {
        path: '',
        component: HomeComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        }
    },
    {
        path: 'admin',
        component: AdminComponent,
        data: {
            authorities: [],
            pageTitle: 'admin.title'
        }
    }
];
