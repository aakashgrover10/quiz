import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConductionTestsSharedModule } from '../../shared';
import {
    CustomUserService,
    CustomUserPopupService,
    CustomUserComponent,
    CustomUserDetailComponent,
    CustomUserDialogComponent,
    CustomUserPopupComponent,
    CustomUserDeletePopupComponent,
    CustomUserDeleteDialogComponent,
    customUserRoute,
    customUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...customUserRoute,
    ...customUserPopupRoute,
];

@NgModule({
    imports: [
        ConductionTestsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomUserComponent,
        CustomUserDetailComponent,
        CustomUserDialogComponent,
        CustomUserDeleteDialogComponent,
        CustomUserPopupComponent,
        CustomUserDeletePopupComponent,
    ],
    entryComponents: [
        CustomUserComponent,
        CustomUserDialogComponent,
        CustomUserPopupComponent,
        CustomUserDeleteDialogComponent,
        CustomUserDeletePopupComponent,
    ],
    providers: [
        CustomUserService,
        CustomUserPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConductionTestsCustomUserModule {}
