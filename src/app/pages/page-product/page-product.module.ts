import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageProductComponent} from './page-product.component';
import {SharedModule} from '../../@shared/shared.module';
import {PageProductInfoComponent} from './page-product-info/page-product-info.component';
import {PageProductButtonsComponent} from './page-product-buttons/page-product-buttons.component';
import {PageProductHeaderComponent} from './page-product-header/page-product-header.component';
import {PageProductPriceComponent} from './page-product-price/page-product-price.component';

@NgModule({
    declarations: [
        PageProductComponent,
        PageProductInfoComponent,
        PageProductButtonsComponent,
        PageProductHeaderComponent,
        PageProductPriceComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
    ]
})
export class PageProductModule {
}
