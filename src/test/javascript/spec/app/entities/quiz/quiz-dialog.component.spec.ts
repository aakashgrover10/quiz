/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ConductionTestsTestModule } from '../../../test.module';
import { QuizDialogComponent } from '../../../../../../main/webapp/app/entities/quiz/quiz-dialog.component';
import { QuizService } from '../../../../../../main/webapp/app/entities/quiz/quiz.service';
import { Quiz } from '../../../../../../main/webapp/app/entities/quiz/quiz.model';
import { PositionService } from '../../../../../../main/webapp/app/entities/position';
import { ResultService } from '../../../../../../main/webapp/app/entities/result';
import { QuestionService } from '../../../../../../main/webapp/app/entities/question';

describe('Component Tests', () => {

    describe('Quiz Management Dialog Component', () => {
        let comp: QuizDialogComponent;
        let fixture: ComponentFixture<QuizDialogComponent>;
        let service: QuizService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConductionTestsTestModule],
                declarations: [QuizDialogComponent],
                providers: [
                    PositionService,
                    ResultService,
                    QuestionService,
                    QuizService
                ]
            })
            .overrideTemplate(QuizDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuizDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuizService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Quiz(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.quiz = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quizListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Quiz();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.quiz = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quizListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
