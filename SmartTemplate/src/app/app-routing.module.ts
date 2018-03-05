import { Route } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { SummaryComponent } from './summary/summary.component';

export const APP_ROUTE: Route[] = [
    {
        path: '',
        component: DynamicFormComponent,
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
    },
    {
        path: 'summary',
        component: SummaryComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        }
    }
];
