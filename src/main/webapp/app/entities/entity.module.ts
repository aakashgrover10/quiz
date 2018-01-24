import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ConductionTestsUserProfileModule } from './user-profile/user-profile.module';
import { ConductionTestsQuizModule } from './quiz/quiz.module';
import { ConductionTestsResultModule } from './result/result.module';
import { ConductionTestsPositionModule } from './position/position.module';
import { ConductionTestsCustomUserModule } from './custom-user/custom-user.module';
import { ConductionTestsQuestionModule } from './question/question.module';
import { ConductionTestsRoleModule } from './role/role.module';

import { UserProfileService } from './user-profile/user-profile.service';
import { QuizService } from './quiz/quiz.service';
import { ResultService } from './result/result.service';
import { PositionService } from './position/position.service';
import { CustomUserService } from './custom-user/custom-user.service';
import { QuestionService } from './question/question.service';
import { RoleService } from './role/role.service';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ConductionTestsUserProfileModule,
        ConductionTestsQuizModule,
        ConductionTestsResultModule,
        ConductionTestsPositionModule,
        ConductionTestsCustomUserModule,
        ConductionTestsQuestionModule,
        ConductionTestsRoleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [UserProfileService, QuizService, ResultService, PositionService, CustomUserService, QuestionService, RoleService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConductionTestsEntityModule {}
