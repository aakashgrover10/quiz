import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomUser } from './custom-user.model';
import { CustomUserPopupService } from './custom-user-popup.service';
import { CustomUserService } from './custom-user.service';

@Component({
    selector: 'jhi-custom-user-delete-dialog',
    templateUrl: './custom-user-delete-dialog.component.html'
})
export class CustomUserDeleteDialogComponent {

    customUser: CustomUser;

    constructor(
        private customUserService: CustomUserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customUserListModification',
                content: 'Deleted an customUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-custom-user-delete-popup',
    template: ''
})
export class CustomUserDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customUserPopupService: CustomUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customUserPopupService
                .open(CustomUserDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
