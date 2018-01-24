import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CustomUserComponent } from './custom-user.component';
import { CustomUserDetailComponent } from './custom-user-detail.component';
import { CustomUserPopupComponent } from './custom-user-dialog.component';
import { CustomUserDeletePopupComponent } from './custom-user-delete-dialog.component';

export const customUserRoute: Routes = [
    {
        path: 'custom-user',
        component: CustomUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomUsers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'custom-user/:id',
        component: CustomUserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customUserPopupRoute: Routes = [
    {
        path: 'custom-user-new',
        component: CustomUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'custom-user/:id/edit',
        component: CustomUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'custom-user/:id/delete',
        component: CustomUserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
