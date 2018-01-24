import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Quiz } from './quiz.model';
import { QuizPopupService } from './quiz-popup.service';
import { QuizService } from './quiz.service';
import { Position, PositionService } from '../position';
import { Result, ResultService } from '../result';
import { Question, QuestionService } from '../question';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-quiz-dialog',
    templateUrl: './quiz-dialog.component.html'
})
export class QuizDialogComponent implements OnInit {

    quiz: Quiz;
    isSaving: boolean;

    positions: Position[];

    results: Result[];

    questions: Question[];
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private quizService: QuizService,
        private positionService: PositionService,
        private resultService: ResultService,
        private questionService: QuestionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.positionService.query()
            .subscribe((res: ResponseWrapper) => { this.positions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.resultService
            .query({filter: 'quiz-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.quiz.result || !this.quiz.result.id) {
                    this.results = res.json;
                } else {
                    this.resultService
                        .find(this.quiz.result.id)
                        .subscribe((subRes: Result) => {
                            this.results = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.questionService.query()
            .subscribe((res: ResponseWrapper) => { this.questions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.quiz.id !== undefined) {
            this.subscribeToSaveResponse(
                this.quizService.update(this.quiz));
        } else {
            this.subscribeToSaveResponse(
                this.quizService.create(this.quiz));
        }
    }

    private subscribeToSaveResponse(result: Observable<Quiz>) {
        result.subscribe((res: Quiz) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Quiz) {
        this.eventManager.broadcast({ name: 'quizListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPositionById(index: number, item: Position) {
        return item.id;
    }

    trackResultById(index: number, item: Result) {
        return item.id;
    }

    trackQuestionById(index: number, item: Question) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-quiz-popup',
    template: ''
})
export class QuizPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quizPopupService: QuizPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.quizPopupService
                    .open(QuizDialogComponent as Component, params['id']);
            } else {
                this.quizPopupService
                    .open(QuizDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
