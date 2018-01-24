/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ConductionTestsTestModule } from '../../../test.module';
import { UserProfileComponent } from '../../../../../../main/webapp/app/entities/user-profile/user-profile.component';
import { UserProfileService } from '../../../../../../main/webapp/app/entities/user-profile/user-profile.service';
import { UserProfile } from '../../../../../../main/webapp/app/entities/user-profile/user-profile.model';

describe('Component Tests', () => {

    describe('UserProfile Management Component', () => {
        let comp: UserProfileComponent;
        let fixture: ComponentFixture<UserProfileComponent>;
        let service: UserProfileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConductionTestsTestModule],
                declarations: [UserProfileComponent],
                providers: [
                    UserProfileService
                ]
            })
            .overrideTemplate(UserProfileComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserProfileComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserProfileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new UserProfile(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userProfiles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
