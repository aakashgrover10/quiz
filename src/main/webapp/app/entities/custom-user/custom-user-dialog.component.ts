import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomUser } from './custom-user.model';
import { CustomUserPopupService } from './custom-user-popup.service';
import { CustomUserService } from './custom-user.service';
import { UserProfile, UserProfileService } from '../user-profile';
import { Position, PositionService } from '../position';
import { Role, RoleService } from '../role';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-custom-user-dialog',
    templateUrl: './custom-user-dialog.component.html'
})
export class CustomUserDialogComponent implements OnInit {

    customUser: CustomUser;
    isSaving: boolean;

    userprofiles: UserProfile[];

    positions: Position[];

    roles: Role[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customUserService: CustomUserService,
        private userProfileService: UserProfileService,
        private positionService: PositionService,
        private roleService: RoleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userProfileService
            .query({filter: 'customuser-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.customUser.userProfile || !this.customUser.userProfile.id) {
                    this.userprofiles = res.json;
                } else {
                    this.userProfileService
                        .find(this.customUser.userProfile.id)
                        .subscribe((subRes: UserProfile) => {
                            this.userprofiles = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.positionService.query()
            .subscribe((res: ResponseWrapper) => { this.positions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.roleService.query()
            .subscribe((res: ResponseWrapper) => { this.roles = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customUserService.update(this.customUser));
        } else {
            this.subscribeToSaveResponse(
                this.customUserService.create(this.customUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<CustomUser>) {
        result.subscribe((res: CustomUser) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomUser) {
        this.eventManager.broadcast({ name: 'customUserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserProfileById(index: number, item: UserProfile) {
        return item.id;
    }

    trackPositionById(index: number, item: Position) {
        return item.id;
    }

    trackRoleById(index: number, item: Role) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-custom-user-popup',
    template: ''
})
export class CustomUserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customUserPopupService: CustomUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customUserPopupService
                    .open(CustomUserDialogComponent as Component, params['id']);
            } else {
                this.customUserPopupService
                    .open(CustomUserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
