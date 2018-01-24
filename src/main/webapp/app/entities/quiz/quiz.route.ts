import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { QuizComponent } from './quiz.component';
import { QuizDetailComponent } from './quiz-detail.component';
import { QuizPopupComponent } from './quiz-dialog.component';
import { QuizDeletePopupComponent } from './quiz-delete-dialog.component';

export const quizRoute: Routes = [
    {
        path: 'quiz',
        component: QuizComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'quiz/:id',
        component: QuizDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quizPopupRoute: Routes = [
    {
        path: 'quiz-new',
        component: QuizPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quiz/:id/edit',
        component: QuizPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quiz/:id/delete',
        component: QuizDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
