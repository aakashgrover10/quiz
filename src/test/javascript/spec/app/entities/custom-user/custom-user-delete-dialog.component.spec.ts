/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ConductionTestsTestModule } from '../../../test.module';
import { CustomUserDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/custom-user/custom-user-delete-dialog.component';
import { CustomUserService } from '../../../../../../main/webapp/app/entities/custom-user/custom-user.service';

describe('Component Tests', () => {

    describe('CustomUser Management Delete Component', () => {
        let comp: CustomUserDeleteDialogComponent;
        let fixture: ComponentFixture<CustomUserDeleteDialogComponent>;
        let service: CustomUserService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConductionTestsTestModule],
                declarations: [CustomUserDeleteDialogComponent],
                providers: [
                    CustomUserService
                ]
            })
            .overrideTemplate(CustomUserDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomUserDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomUserService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
