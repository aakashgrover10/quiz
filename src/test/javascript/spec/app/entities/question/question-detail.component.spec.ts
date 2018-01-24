/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ConductionTestsTestModule } from '../../../test.module';
import { QuestionDetailComponent } from '../../../../../../main/webapp/app/entities/question/question-detail.component';
import { QuestionService } from '../../../../../../main/webapp/app/entities/question/question.service';
import { Question } from '../../../../../../main/webapp/app/entities/question/question.model';

describe('Component Tests', () => {

    describe('Question Management Detail Component', () => {
        let comp: QuestionDetailComponent;
        let fixture: ComponentFixture<QuestionDetailComponent>;
        let service: QuestionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConductionTestsTestModule],
                declarations: [QuestionDetailComponent],
                providers: [
                    QuestionService
                ]
            })
            .overrideTemplate(QuestionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuestionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Question(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.question).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
