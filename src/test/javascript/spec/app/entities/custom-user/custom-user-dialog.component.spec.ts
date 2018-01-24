/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ConductionTestsTestModule } from '../../../test.module';
import { CustomUserDialogComponent } from '../../../../../../main/webapp/app/entities/custom-user/custom-user-dialog.component';
import { CustomUserService } from '../../../../../../main/webapp/app/entities/custom-user/custom-user.service';
import { CustomUser } from '../../../../../../main/webapp/app/entities/custom-user/custom-user.model';
import { UserProfileService } from '../../../../../../main/webapp/app/entities/user-profile';
import { PositionService } from '../../../../../../main/webapp/app/entities/position';
import { RoleService } from '../../../../../../main/webapp/app/entities/role';

describe('Component Tests', () => {

    describe('CustomUser Management Dialog Component', () => {
        let comp: CustomUserDialogComponent;
        let fixture: ComponentFixture<CustomUserDialogComponent>;
        let service: CustomUserService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConductionTestsTestModule],
                declarations: [CustomUserDialogComponent],
                providers: [
                    UserProfileService,
                    PositionService,
                    RoleService,
                    CustomUserService
                ]
            })
            .overrideTemplate(CustomUserDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomUserDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomUserService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomUser(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.customUser = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customUserListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomUser();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.customUser = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customUserListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
