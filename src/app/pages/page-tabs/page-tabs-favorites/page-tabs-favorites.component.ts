import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PageTabsFavoritesPopupComponent} from './page-tabs-favorites-popup/page-tabs-favorites-popup.component';
import {IPageTab, PageTabType} from '../../../models/page-tab.model';

@Component({
    selector: 'app-page-tabs-favorites',
    templateUrl: './page-tabs-favorites.component.html',
    styleUrls: ['./page-tabs-favorites.component.scss'],
})
export class PageTabsFavoritesComponent implements OnInit, IPageTab {
    readonly tabName: PageTabType = 'like';

    constructor(private modalController: ModalController) {}

    ngOnInit(): void {
    }

    // TODO: add items
    public itemClick(): void {
        this.modalOpen().then();
    }

    private async modalOpen(): Promise<void> {
        const modal = await this.modalController.create({
            component: PageTabsFavoritesPopupComponent,
        });
        return await modal.present();
    }
}
