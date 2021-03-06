/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ConductionTestsTestModule } from '../../../test.module';
import { PositionDetailComponent } from '../../../../../../main/webapp/app/entities/position/position-detail.component';
import { PositionService } from '../../../../../../main/webapp/app/entities/position/position.service';
import { Position } from '../../../../../../main/webapp/app/entities/position/position.model';

describe('Component Tests', () => {

    describe('Position Management Detail Component', () => {
        let comp: PositionDetailComponent;
        let fixture: ComponentFixture<PositionDetailComponent>;
        let service: PositionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConductionTestsTestModule],
                declarations: [PositionDetailComponent],
                providers: [
                    PositionService
                ]
            })
            .overrideTemplate(PositionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PositionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Position(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.position).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
