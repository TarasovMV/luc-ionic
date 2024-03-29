import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PageTabsFavoritesPopupComponent} from './page-tabs-favorites-popup/page-tabs-favorites-popup.component';
import {IPageTab, PageTabType} from '../../../models/page-tab.model';
import {BehaviorSubject} from 'rxjs';
import {IProductModel} from '../../../models/page-product.model';
import {ApiUserService} from '../../../@core/services/api/api-user.service';

@Component({
    selector: 'app-page-tabs-favorites',
    templateUrl: './page-tabs-favorites.component.html',
    styleUrls: ['./page-tabs-favorites.component.scss'],
})
export class PageTabsFavoritesComponent implements OnInit, IPageTab {
    readonly tabName: PageTabType = 'like';
    public data$: BehaviorSubject<IProductModel[]> = new BehaviorSubject<IProductModel[]>([]);

    constructor(
        private modalController: ModalController,
        private apiUserService: ApiUserService,
    ) {}

    public ngOnInit(): void {
        this.loadFavorites().then();
    }

    public itemClick(item: IProductModel): void {
        this.modalOpen(item).then();
    }

    public async doRefresh(event): Promise<void> {
        await this.loadFavorites();
        setTimeout(() => {
            event.srcElement.complete();
        }, 300);
    }

    private async loadFavorites(): Promise<void> {
        const res = (await this.apiUserService.getFavorites())?.map(x => x.feed) ?? [];
        if (JSON.stringify(this.data$.getValue()) === JSON.stringify(res)) {
            return;
        }
        this.data$.next(res);
    }

    private async modalOpen(item: IProductModel): Promise<void> {
        const modal = await this.modalController.create({
            component: PageTabsFavoritesPopupComponent,
            componentProps: { data: {item, delete: () => this.deleteItem(item)} }
        });
        modal.onDidDismiss().then(() => this.loadFavorites());
        return await modal.present();
    }

    private async deleteItem(item: IProductModel): Promise<void> {
        await this.apiUserService.deleteFavorites(item.id);
    }
}
