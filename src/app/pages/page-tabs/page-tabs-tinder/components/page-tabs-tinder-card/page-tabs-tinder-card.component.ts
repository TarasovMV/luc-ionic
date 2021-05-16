import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ModalController, NavController} from '@ionic/angular';
import {urlToDataUrl} from '../../../../../@shared/functions/base64-file.function';
import {LoadingService} from '../../../../../@core/services/loading.service';
import {ITinderSuggestion} from '../../../../../models/tinder.model';
import {filter, map} from 'rxjs/operators';
import {ApiRecognitionService} from '../../../../../@core/services/api/api-recognition.service';
import {RecognitionInfoService} from '../../../../../@core/services/recognition-info.service';
import {PageProductComponent} from '../../../../page-product/page-product.component';
import {FavoritesController} from '../../../../../@shared/classes/favorites.class';
import {ApiUserService} from '../../../../../@core/services/api/api-user.service';
import {ApiFileService} from '../../../../../@core/services/api/api-file.service';

@Component({
    selector: 'app-page-tabs-tinder-card',
    templateUrl: './page-tabs-tinder-card.component.html',
    styleUrls: ['./page-tabs-tinder-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsTinderCardComponent implements OnInit {

    @Input() private set data(method: () => Promise<ITinderSuggestion>) {
        this.disableInfo();
        method().then((res) => {
            if (!res) {
                // TODO: add error handler
                return;
            }
            res.imageUrl = res.type !== 'tinderItem' ? res.imageUrl : this.apiFileService.getTinderPhotoById(res.tinderId);
            this.data$.next(res);
        });
    }
    public data$: BehaviorSubject<ITinderSuggestion> = new BehaviorSubject<ITinderSuggestion>(null);
    public isFavorite$: Observable<boolean> = this.data$.pipe(
        map(x => x?.feedPreview?.isFavorite)
    );
    public shopUrl$: Observable<number> = this.data$.pipe(
            filter(x => x.type === 'feed'),
            map(x => x.feedId)
        );
    public isInfo$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private readonly nextRouteUrl = '/main/camera';
    private readonly favoritesController: FavoritesController;

    constructor(
        private navCtrl: NavController,
        private loadingService: LoadingService,
        private apiRecognitionService: ApiRecognitionService,
        private modalController: ModalController,
        private recognitionInfoService: RecognitionInfoService,
        private apiUserService: ApiUserService,
        private apiFileService: ApiFileService,
    ) {
        this.favoritesController = new FavoritesController(apiUserService);
    }

    public ngOnInit(): void {}

    public toggleInfo(): void {
        this.isInfo$.next(!this.isInfo$.value);
    }

    public async search(): Promise<void> {
        if (!this.data$.getValue()) {
            return;
        }
        await this.loadingService.startLoading();
        const img = await urlToDataUrl(this.data$.value.imageUrl);
        await this.loadingService.stopLoading();
        await this.navCtrl.navigateForward(this.nextRouteUrl, {queryParams: { img }});
    }

    public async openProduct(): Promise<void> {
        const productId = this.data$.getValue()?.feedId;
        if (!productId) { return; }
        this.recognitionInfoService.recognitionFeedFunction = () => this.apiRecognitionService.getFullItem(productId);
        await this.presentModalInfo();
    }

    public async setFavorite(): Promise<void> {
        const data = this.data$.getValue();
        console.log('setFavorite', data);
        if (!data.feedPreview) { return; }
        data.feedPreview.isFavorite = await this.favoritesController.setFavourite(data.feedId, !data.feedPreview.isFavorite);
        this.data$.next({ ...data });
    }

    private disableInfo(): void {
        this.isInfo$.next(false);
    }

    private async presentModalInfo() {
        const modal = await this.modalController.create({
            component: PageProductComponent,
        });
        return await modal.present();
    }
}
