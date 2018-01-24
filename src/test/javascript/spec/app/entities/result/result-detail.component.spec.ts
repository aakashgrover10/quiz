/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ConductionTestsTestModule } from '../../../test.module';
import { ResultDetailComponent } from '../../../../../../main/webapp/app/entities/result/result-detail.component';
import { ResultService } from '../../../../../../main/webapp/app/entities/result/result.service';
import { Result } from '../../../../../../main/webapp/app/entities/result/result.model';

describe('Component Tests', () => {

    describe('Result Management Detail Component', () => {
        let comp: ResultDetailComponent;
        let fixture: ComponentFixture<ResultDetailComponent>;
        let service: ResultService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConductionTestsTestModule],
                declarations: [ResultDetailComponent],
                providers: [
                    ResultService
                ]
            })
            .overrideTemplate(ResultDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResultDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResultService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Result(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.result).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
