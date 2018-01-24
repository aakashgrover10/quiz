/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ConductionTestsTestModule } from '../../../test.module';
import { CustomUserDetailComponent } from '../../../../../../main/webapp/app/entities/custom-user/custom-user-detail.component';
import { CustomUserService } from '../../../../../../main/webapp/app/entities/custom-user/custom-user.service';
import { CustomUser } from '../../../../../../main/webapp/app/entities/custom-user/custom-user.model';

describe('Component Tests', () => {

    describe('CustomUser Management Detail Component', () => {
        let comp: CustomUserDetailComponent;
        let fixture: ComponentFixture<CustomUserDetailComponent>;
        let service: CustomUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConductionTestsTestModule],
                declarations: [CustomUserDetailComponent],
                providers: [
                    CustomUserService
                ]
            })
            .overrideTemplate(CustomUserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CustomUser(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
