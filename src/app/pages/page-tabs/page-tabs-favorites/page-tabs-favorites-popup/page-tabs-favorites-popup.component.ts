import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {animate, style, transition, trigger} from '@angular/animations';
import {urlToDataUrl} from '../../../../@shared/functions/base64-file.function';
import {StatusBarService} from '../../../../@core/services/platform/status-bar.service';
import {MobileShareService} from '../../../../@core/services/platform/mobile-share.service';
import {RecognitionInfoService} from '../../../../@core/services/recognition-info.service';
import {ApiRecognitionService} from '../../../../@core/services/api/api-recognition.service';
import {PageProductComponent} from '../../../page-product/page-product.component';
import {IFavouriteItem} from '../../../../models/favorites.model';
import {BackButtonService} from '../../../../@core/services/platform/back-button.service';
import {AnalyticService} from '../../../../@core/services/analytic.service';

@Component({
    selector: 'app-page-tabs-favorites-popup',
    templateUrl: './page-tabs-favorites-popup.component.html',
    styleUrls: ['./page-tabs-favorites-popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('enterTrigger', [
            transition('void => *', [
                style({opacity: 0}),
                animate('300ms', style({opacity: 1}))
            ]),
            transition('* => void', [
                style({opacity: 1}),
                animate('300ms', style({opacity: 0}))
            ]),
        ])
    ],
})
export class PageTabsFavoritesPopupComponent implements OnInit, OnDestroy {
    private readonly nextRouteUrl = '/main/camera';
    @Input() set data(value: {item: IFavouriteItem, delete: () => Promise<void>}) {
        this.imgSrc = value.item.imageUrl;
        this.item = { ...value.item };
        this.deleteFn = value.delete;
        this.isFeed = !!value.item?.feed;
    }

    public imgSrc: string = null;
    public isFeed: boolean = false;
    public isInterface$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private item: IFavouriteItem = null;
    private isSetDefault: boolean = true;
    private deleteFn: () => Promise<void>;

    constructor(
        private statusBarService: StatusBarService,
        private modalController: ModalController,
        private navCtrl: NavController,
        private shareService: MobileShareService,
        private recognitionInfoService: RecognitionInfoService,
        private apiRecognitionService: ApiRecognitionService,
        private backButtonService: BackButtonService,
        private analyticService: AnalyticService,
    ) {}

    ngOnInit(): void {
        this.statusBarService.hide().then();
        this.backButtonService.actionOnBack(() => this.closeModal(), false);
    }

    async ngOnDestroy(): Promise<void> {
        if (!this.isSetDefault) {
            return;
        }
        await this.statusBarService.setDefault();
    }

    public switchVisible(): void {
        this.isInterface$.next(!this.isInterface$.value);
    }

    public async close(event: MouseEvent): Promise<void> {
        event.stopPropagation();
        await this.closeModal();
    }

    public async delete(event: MouseEvent): Promise<void> {
        event.stopPropagation();
        await this.deleteFn();
        await this.closeModal();
    }

    public async search(event: MouseEvent): Promise<void> {
        event.stopPropagation();
        const img = await urlToDataUrl(this.imgSrc);
        this.isSetDefault = false;
        await this.navCtrl.navigateForward(this.nextRouteUrl, {queryParams: { img }});
        await this.closeModal();
        this.analyticService.log('favorite-search', {favoriteId: this.item.tinderItem?.id || this.item.feed?.id});
    }

    public share(event: MouseEvent): void {
        event.stopPropagation();
        const product = this.item?.feed;
        if (!product) { return; }
        this.shareService.shareData(
            'Отправленно из приложения LUC',
            `Посмотри что нашел в LUC в магазине ${product.shopTitle}:`,
            product.shopUrl,
        );
    }

    public async openProduct(event: MouseEvent): Promise<void> {
        event.stopPropagation();
        const productId = this.item.feed?.id;
        if (!productId) { return; }
        this.recognitionInfoService.recognitionFeedFunction = () => this.apiRecognitionService.getFullItem(productId);
        await this.presentModalInfo();
    }

    private async presentModalInfo() {
        const modal = await this.modalController.create({
            component: PageProductComponent,
        });
        return await modal.present();
    }

    private async closeModal(): Promise<void> {
        await this.modalController.dismiss();
    }
}
