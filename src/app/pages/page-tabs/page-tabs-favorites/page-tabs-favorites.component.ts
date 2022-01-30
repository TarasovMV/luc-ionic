import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PageTabsFavoritesPopupComponent} from './page-tabs-favorites-popup/page-tabs-favorites-popup.component';
import {IPageTab, PageTabType} from '../../../models/page-tab.model';
import {BehaviorSubject} from 'rxjs';
import {ApiUserService} from '../../../@core/services/api/api-user.service';
import {IFavouriteItem} from '../../../models/favorites.model';
import {RecognitionInfoService} from '../../../@core/services/recognition-info.service';

@Component({
    selector: 'app-page-tabs-favorites',
    templateUrl: './page-tabs-favorites.component.html',
    styleUrls: ['./page-tabs-favorites.component.scss'],
})
export class PageTabsFavoritesComponent implements OnInit, IPageTab {
    readonly tabName: PageTabType = 'like';
    public data$: BehaviorSubject<IFavouriteItem[]> = new BehaviorSubject<IFavouriteItem[]>([]);

    constructor(
        private modalController: ModalController,
        private apiUserService: ApiUserService,
        private recognitionInfoService: RecognitionInfoService,
    ) {}

    public ngOnInit(): void {
        this.loadFavorites().then();
    }

    public itemClick(item: IFavouriteItem): void {
        this.modalOpen(item).then();
    }

    public async doRefresh(event): Promise<void> {
        await this.loadFavorites();
        setTimeout(() => {
            event.srcElement.complete();
        }, 300);
    }

    private async loadFavorites(): Promise<void> {
        console.log('load favourites');
        let res = (await this.apiUserService.getFavorites()) ?? [];
        if (JSON.stringify(this.data$.getValue()) === JSON.stringify(res)) {
            return;
        }
        res = res.map(x => ({
            ...x,
            imageUrl: this.recognitionInfoService.imgHandlerUrl(!!x.tinderItem ? 'tinderItem' : 'feed', x.feed?.id ?? x.tinderItem?.id)
        }));
        this.data$.next(res);
    }

    private async modalOpen(item: IFavouriteItem): Promise<void> {
        const modal = await this.modalController.create({
            component: PageTabsFavoritesPopupComponent,
            componentProps: { data: {item, delete: () => this.deleteItem(item)} }
        });
        try {
            modal.onDidDismiss().then((x) => {
                if (x?.data?.res) {
                    this.loadFavorites();
                }
            });
        } catch (e) {}
        return await modal.present();
    }

    private async deleteItem(item: IFavouriteItem): Promise<void> {
        if (!!item.feed) {
            await this.apiUserService.deleteFeedFavorites(item.feed?.id);
        } else if (!!item.tinderItem) {
            await this.apiUserService.deleteTinderFavorites(item.tinderItem?.id);
        }
    }
}
