/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ConductionTestsTestModule } from '../../../test.module';
import { QuestionComponent } from '../../../../../../main/webapp/app/entities/question/question.component';
import { QuestionService } from '../../../../../../main/webapp/app/entities/question/question.service';
import { Question } from '../../../../../../main/webapp/app/entities/question/question.model';

describe('Component Tests', () => {

    describe('Question Management Component', () => {
        let comp: QuestionComponent;
        let fixture: ComponentFixture<QuestionComponent>;
        let service: QuestionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConductionTestsTestModule],
                declarations: [QuestionComponent],
                providers: [
                    QuestionService
                ]
            })
            .overrideTemplate(QuestionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuestionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Question(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.questions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
