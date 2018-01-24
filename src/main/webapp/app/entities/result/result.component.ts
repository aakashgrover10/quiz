import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Result } from './result.model';
import { ResultService } from './result.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-result',
    templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit, OnDestroy {
results: Result[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private resultService: ResultService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.resultService.query().subscribe(
            (res: ResponseWrapper) => {
                this.results = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResults();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Result) {
        return item.id;
    }
    registerChangeInResults() {
        this.eventSubscriber = this.eventManager.subscribe('resultListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
