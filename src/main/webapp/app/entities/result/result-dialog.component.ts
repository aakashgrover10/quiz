import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Result } from './result.model';
import { ResultPopupService } from './result-popup.service';
import { ResultService } from './result.service';
import { Quiz, QuizService } from '../quiz';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-result-dialog',
    templateUrl: './result-dialog.component.html'
})
export class ResultDialogComponent implements OnInit {

    result: Result;
    isSaving: boolean;

    quizzes: Quiz[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private resultService: ResultService,
        private quizService: QuizService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.quizService.query()
            .subscribe((res: ResponseWrapper) => { this.quizzes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.result.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resultService.update(this.result));
        } else {
            this.subscribeToSaveResponse(
                this.resultService.create(this.result));
        }
    }

    private subscribeToSaveResponse(result: Observable<Result>) {
        result.subscribe((res: Result) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Result) {
        this.eventManager.broadcast({ name: 'resultListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackQuizById(index: number, item: Quiz) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-result-popup',
    template: ''
})
export class ResultPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resultPopupService: ResultPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.resultPopupService
                    .open(ResultDialogComponent as Component, params['id']);
            } else {
                this.resultPopupService
                    .open(ResultDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
