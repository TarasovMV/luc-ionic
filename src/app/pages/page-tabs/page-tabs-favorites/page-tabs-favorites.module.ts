import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTabsFavoritesComponent} from './page-tabs-favorites.component';
import {RouterModule} from '@angular/router';
import {PageTabsFavouritesItemComponent} from './page-tabs-favourites-item/page-tabs-favourites-item.component';
import {SharedModule} from '../../../@shared/shared.module';
import {PageTabsFavoritesPopupComponent} from './page-tabs-favorites-popup/page-tabs-favorites-popup.component';
import {PageProductModule} from '../../page-product/page-product.module';


@NgModule({
    declarations: [PageTabsFavoritesComponent, PageTabsFavouritesItemComponent, PageTabsFavoritesPopupComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: PageTabsFavoritesComponent}]),
        SharedModule,
        PageProductModule,
    ]
})
export class PageTabsFavoritesModule {
}
