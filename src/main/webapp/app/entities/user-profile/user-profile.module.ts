import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConductionTestsSharedModule } from '../../shared';
import { CustomUserService } from '../custom-user/custom-user.service';
import {
    UserProfileService,
    UserProfilePopupService,
    UserProfileComponent,
    UserProfileDetailComponent,
    UserProfileDialogComponent,
    UserProfilePopupComponent,
    UserProfileDeletePopupComponent,
    UserProfileDeleteDialogComponent,
    userProfileRoute,
    userProfilePopupRoute,
} from './';

const ENTITY_STATES = [
    ...userProfileRoute,
    ...userProfilePopupRoute,
];

@NgModule({
    imports: [
        ConductionTestsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserProfileComponent,
        UserProfileDetailComponent,
        UserProfileDialogComponent,
        UserProfileDeleteDialogComponent,
        UserProfilePopupComponent,
        UserProfileDeletePopupComponent,
    ],
    entryComponents: [
        UserProfileComponent,
        UserProfileDialogComponent,
        UserProfilePopupComponent,
        UserProfileDeleteDialogComponent,
        UserProfileDeletePopupComponent,
    ],
    providers: [
        CustomUserService,
        UserProfileService,
        UserProfilePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConductionTestsUserProfileModule {}
