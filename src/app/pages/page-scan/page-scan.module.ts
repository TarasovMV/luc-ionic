import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageScanComponent} from './page-scan.component';
import {PageScanProductComponent} from './page-scan-product/page-scan-product.component';
import {SharedModule} from '../../@shared/shared.module';
import {RouterModule} from '@angular/router';
import {SharedFilterModule} from '../../popups/shared-filter/shared-filter.module';


@NgModule({
    declarations: [PageScanComponent, PageScanProductComponent],
    imports: [
        CommonModule,
        SharedModule,
        SharedFilterModule,
        RouterModule.forChild([{path: '', component: PageScanComponent}]),
    ]
})
export class PageScanModule {
}
