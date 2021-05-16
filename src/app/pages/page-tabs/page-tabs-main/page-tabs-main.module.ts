import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../@shared/shared.module';
import {PageTabsMainComponent} from './page-tabs-main.component';
import {RouterModule} from '@angular/router';
import {PageTabsMainCameraComponent} from './page-tabs-main-camera/page-tabs-main-camera.component';
import {PageTabsMainSearchComponent} from './page-tabs-main-search/page-tabs-main-search.component';
import {PageTabsMainTrendCardComponent} from './page-tabs-main-trend-card/page-tabs-main-trend-card.component';
import {PageTabsMainRecommendCardComponent} from './page-tabs-main-recommend-card/page-tabs-main-recommend-card.component';
import {PageTabsMainSearchModalComponent} from './page-tabs-main-search-modal/page-tabs-main-search-modal.component';
import {PageTabsMainArticleComponent} from './page-tabs-main-article/page-tabs-main-article.component';
import {PageProductModule} from '../../page-product/page-product.module';


@NgModule({
    declarations: [
        PageTabsMainComponent,
        PageTabsMainCameraComponent,
        PageTabsMainSearchComponent,
        PageTabsMainTrendCardComponent,
        PageTabsMainRecommendCardComponent,
        PageTabsMainSearchModalComponent,
        PageTabsMainArticleComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: PageTabsMainComponent}]),
        PageProductModule,
    ]
})
export class PageTabsMainModule {
}
