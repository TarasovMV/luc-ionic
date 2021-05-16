import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PageTabsMainSearchModalComponent} from './page-tabs-main-search-modal/page-tabs-main-search-modal.component';
import {IPageTab, PageTabType} from '../../../models/page-tab.model';
import {RecognitionInfoService} from '../../../@core/services/recognition-info.service';
import {BehaviorSubject} from 'rxjs';
import {IProductPreviewModel} from '../../../models/page-product.model';
import {UserInfoService} from '../../../@core/services/user-info.service';
import {IArticle} from '../../../models/article.model';

@Component({
    selector: 'app-page-tabs-main',
    templateUrl: './page-tabs-main.component.html',
    styleUrls: ['./page-tabs-main.component.scss'],
})
export class PageTabsMainComponent implements IPageTab, OnInit, OnDestroy {
    readonly tabName: PageTabType = 'search';
    public readonly recommends$: BehaviorSubject<IProductPreviewModel[]> = this.recognitionInfoService.recommendCards$;
    public readonly articles$: BehaviorSubject<IArticle[]> = new BehaviorSubject<IArticle[]>(new Array(2));

    constructor(
        private modalController: ModalController,
        private recognitionInfoService: RecognitionInfoService,
        private userInfoService: UserInfoService,
    ) {}

    public ngOnInit(): void {
        this.getRecommendCards().then();
        this.getArticles().then();
    }

    public ngOnDestroy(): void {
    }

    private async getRecommendCards(): Promise<void> {
        await this.recognitionInfoService.getMainRecommends();
    }

    private async getArticles(): Promise<void> {
        const res = await this.userInfoService.getAllArticles();
        console.log(res);
        this.articles$.next(res);
    }

    public async presentModalSearch(): Promise<void> {
        const modal = await this.modalController.create({
            component: PageTabsMainSearchModalComponent,
        });
        await modal.present();
    }
}
