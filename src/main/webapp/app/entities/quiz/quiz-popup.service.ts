import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Quiz } from './quiz.model';
import { QuizService } from './quiz.service';

@Injectable()
export class QuizPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private quizService: QuizService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.quizService.find(id).subscribe((quiz) => {
                    if (quiz.startDate) {
                        quiz.startDate = {
                            year: quiz.startDate.getFullYear(),
                            month: quiz.startDate.getMonth() + 1,
                            day: quiz.startDate.getDate()
                        };
                    }
                    if (quiz.endDate) {
                        quiz.endDate = {
                            year: quiz.endDate.getFullYear(),
                            month: quiz.endDate.getMonth() + 1,
                            day: quiz.endDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.quizModalRef(component, quiz);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.quizModalRef(component, new Quiz());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    quizModalRef(component: Component, quiz: Quiz): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.quiz = quiz;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
