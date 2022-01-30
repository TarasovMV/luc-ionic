import {Component, Input, OnInit} from '@angular/core';
import {IProductModel} from '../../models/page-product.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {RecognitionInfoService} from '../../@core/services/recognition-info.service';
import {ApiUserService} from '../../@core/services/api/api-user.service';
import {FavoritesController} from '../../@shared/classes/favorites.class';
import {MobileShareService} from '../../@core/services/platform/mobile-share.service';
import {BackButtonService} from '../../@core/services/platform/back-button.service';
import {filter, map} from 'rxjs/operators';
import {AppConfigService} from '../../@core/services/platform/app-config.service';

@Component({
    selector: 'app-page-product',
    templateUrl: './page-product.component.html',
    styleUrls: ['./page-product.component.scss'],
})
export class PageProductComponent implements OnInit {
    private readonly favoritesController: FavoritesController;
    private data$: BehaviorSubject<IProductModel> = new BehaviorSubject<IProductModel>(null);
    public sharedData: Observable<IProductModel> = this.data$;
    public imageUrl$: Observable<string> = this.data$.pipe(filter(x => !!x), map(x => `${this.restUrl}/api/Photo/feed/${x.id}`));

    private readonly restUrl: string;

    constructor(
        public modalCtrl: ModalController,
        private recognitionInfoService: RecognitionInfoService,
        private shareService: MobileShareService,
        private backButtonService: BackButtonService,
        apiUserService: ApiUserService,
        appConfigService: AppConfigService,
    ) {
        this.favoritesController = new FavoritesController(apiUserService);
        this.restUrl = appConfigService.fileUrl;
    }

    public async ngOnInit(): Promise<void> {
        this.backButtonService.actionOnBack(() => this.closePage(), false);
        const res = await this.recognitionInfoService.recognitionFeedFunction?.();
        console.log(res);
        res.infoList = res.infoList ?? [];
        this.data$.next(res);
        console.log(res);
    }

    public async setFavorite(): Promise<void> {
        const product = this.data$.getValue();
        const isFavorite = await this.favoritesController.setFavourite({feedId: product.id}, !product.isFavorite);
        this.data$.next({...product, isFavorite});
    }

    public async closePage(): Promise<void> {
        await this.modalCtrl.dismiss();
    }

    public shareProduct(): void {
        const product = this.data$.getValue();
        if (!product) { return; }
        this.shareService.shareData(
            'Отправленно из приложения LUC',
            `Посмотри что нашел в LUC в магазине ${product.shopTitle}:`,
            product.shopUrl,
        );
    }
}
