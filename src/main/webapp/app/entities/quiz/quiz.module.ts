import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConductionTestsSharedModule } from '../../shared';
import {
    QuizService,
    QuizPopupService,
    QuizComponent,
    QuizDetailComponent,
    QuizDialogComponent,
    QuizPopupComponent,
    QuizDeletePopupComponent,
    QuizDeleteDialogComponent,
    quizRoute,
    quizPopupRoute,
} from './';

const ENTITY_STATES = [
    ...quizRoute,
    ...quizPopupRoute,
];

@NgModule({
    imports: [
        ConductionTestsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuizComponent,
        QuizDetailComponent,
        QuizDialogComponent,
        QuizDeleteDialogComponent,
        QuizPopupComponent,
        QuizDeletePopupComponent,
    ],
    entryComponents: [
        QuizComponent,
        QuizDialogComponent,
        QuizPopupComponent,
        QuizDeleteDialogComponent,
        QuizDeletePopupComponent,
    ],
    providers: [
        QuizService,
        QuizPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConductionTestsQuizModule {}
