import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Quiz } from './quiz.model';
import { QuizPopupService } from './quiz-popup.service';
import { QuizService } from './quiz.service';

@Component({
    selector: 'jhi-quiz-delete-dialog',
    templateUrl: './quiz-delete-dialog.component.html'
})
export class QuizDeleteDialogComponent {

    quiz: Quiz;

    constructor(
        private quizService: QuizService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.quizService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'quizListModification',
                content: 'Deleted an quiz'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-quiz-delete-popup',
    template: ''
})
export class QuizDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quizPopupService: QuizPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.quizPopupService
                .open(QuizDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
