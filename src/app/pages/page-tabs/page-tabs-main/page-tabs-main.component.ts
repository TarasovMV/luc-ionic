import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PageTabsMainSearchModalComponent} from './page-tabs-main-search-modal/page-tabs-main-search-modal.component';
import {IPageTab, PageTabType} from '../../../models/page-tab.model';

@Component({
    selector: 'app-page-tabs-main',
    templateUrl: './page-tabs-main.component.html',
    styleUrls: ['./page-tabs-main.component.scss'],
})
export class PageTabsMainComponent implements IPageTab, OnInit, OnDestroy {
    readonly tabName: PageTabType = 'search';

    constructor(private modalController: ModalController) {}

    ngOnInit(): void {
    }

    public ngOnDestroy(): void {
    }

    async presentModalSearch() {
        const modal = await this.modalController.create({
            component: PageTabsMainSearchModalComponent,
        });
        return await modal.present();
    }
}
