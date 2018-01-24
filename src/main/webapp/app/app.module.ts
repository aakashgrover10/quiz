import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { HttpModule } from '@angular/http';

import { ConductionTestsSharedModule, UserRouteAccessService } from './shared';
import { ConductionTestsAppRoutingModule} from './app-routing.module';
import { ConductionTestsHomeModule } from './home/home.module';
import { ConductionTestsAdminModule } from './admin/admin.module';
import { ConductionTestsAccountModule } from './account/account.module';
import { ConductionTestsEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import { UserProfileService } from './entities/user-profile/user-profile.service';
import { QuestionService } from './entities/question/question.service';
import { PositionService } from './entities/position/position.service';
import { CustomUserService } from './entities/custom-user/custom-user.service';
import { QuizService } from './entities/quiz/quiz.service';
import { ResultService } from './entities/result/result.service';
import { RoleService } from './entities/role/role.service';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        ConductionTestsAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        ConductionTestsSharedModule,
        ConductionTestsHomeModule,
        ConductionTestsAdminModule,
        ConductionTestsAccountModule,
        ConductionTestsEntityModule,
        HttpModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService,
        UserProfileService,
        QuestionService,
        PositionService,
        CustomUserService,
        QuizService,
        ResultService,
        RoleService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class ConductionTestsAppModule {}
