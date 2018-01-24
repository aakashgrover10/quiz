import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomUser } from './custom-user.model';
import { CustomUserService } from './custom-user.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-custom-user',
    templateUrl: './custom-user.component.html'
})
export class CustomUserComponent implements OnInit, OnDestroy {
customUsers: CustomUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customUserService: CustomUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.customUserService.query().subscribe(
            (res: ResponseWrapper) => {
                this.customUsers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CustomUser) {
        return item.id;
    }
    registerChangeInCustomUsers() {
        this.eventSubscriber = this.eventManager.subscribe('customUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
