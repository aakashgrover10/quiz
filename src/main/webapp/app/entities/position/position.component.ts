import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Position } from './position.model';
import { PositionService } from './position.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-position',
    templateUrl: './position.component.html'
})
export class PositionComponent implements OnInit, OnDestroy {
positions: Position[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private positionService: PositionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.positionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.positions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPositions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Position) {
        return item.id;
    }
    registerChangeInPositions() {
        this.eventSubscriber = this.eventManager.subscribe('positionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
