/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ConductionTestsTestModule } from '../../../test.module';
import { CustomUserComponent } from '../../../../../../main/webapp/app/entities/custom-user/custom-user.component';
import { CustomUserService } from '../../../../../../main/webapp/app/entities/custom-user/custom-user.service';
import { CustomUser } from '../../../../../../main/webapp/app/entities/custom-user/custom-user.model';

describe('Component Tests', () => {

    describe('CustomUser Management Component', () => {
        let comp: CustomUserComponent;
        let fixture: ComponentFixture<CustomUserComponent>;
        let service: CustomUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConductionTestsTestModule],
                declarations: [CustomUserComponent],
                providers: [
                    CustomUserService
                ]
            })
            .overrideTemplate(CustomUserComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CustomUser(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customUsers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
