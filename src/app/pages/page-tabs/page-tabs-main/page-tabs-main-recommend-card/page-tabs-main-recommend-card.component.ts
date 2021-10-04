import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IPageTabsMainCard} from '../../../../models/page-tabs-main.model';
import {IProductPreviewModel} from '../../../../models/page-product.model';
import {PageProductComponent} from '../../../page-product/page-product.component';
import {RecognitionInfoService} from '../../../../@core/services/recognition-info.service';
import {ModalController} from '@ionic/angular';
import {ApiRecognitionService} from '../../../../@core/services/api/api-recognition.service';
import {AnalyticService} from '../../../../@core/services/analytic.service';

@Component({
    selector: 'app-page-tabs-main-recommend-card',
    templateUrl: './page-tabs-main-recommend-card.component.html',
    styleUrls: ['./page-tabs-main-recommend-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsMainRecommendCardComponent implements OnInit {

    @Input() data: IProductPreviewModel = null;

    constructor(
        private recognitionInfoService: RecognitionInfoService,
        private apiRecognitionService: ApiRecognitionService,
        private modalController: ModalController,
        private analyticService: AnalyticService,
    ) {}

    ngOnInit(): void {}

    public async openProduct(): Promise<void> {
        const productId = this.data.id;
        if (!productId) { return; }
        this.recognitionInfoService.recognitionFeedFunction = () => this.apiRecognitionService.getFullItem(productId);
        await this.presentModalInfo();
        this.analyticService.log('recommendation', {productId});
    }

    private async presentModalInfo() {
        const modal = await this.modalController.create({
            component: PageProductComponent,
        });
        return await modal.present();
    }
}
