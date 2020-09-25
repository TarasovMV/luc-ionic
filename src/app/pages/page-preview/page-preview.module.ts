import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PagePreviewComponent} from './page-preview.component';
import {PagePreviewCardComponent} from './page-preview-card/page-preview-card.component';
import {SharedModule} from '../../@shared/shared.module';
import {PagePreviewPagerComponent} from './page-preview-pager/page-preview-pager.component';

@NgModule({
    declarations: [PagePreviewComponent, PagePreviewCardComponent, PagePreviewPagerComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: PagePreviewComponent}]),
    ]
})

export class PagePreviewModule {
}
