import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagePrefavoritesComponent} from './page-prefavorites.component';
import {RouterModule} from '@angular/router';
import {PagePrefavoritesItemComponent} from './components/page-prefavorites-item/page-prefavorites-item.component';
import {SharedModule} from '../../@shared/shared.module';


@NgModule({
    declarations: [PagePrefavoritesComponent, PagePrefavoritesItemComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: PagePrefavoritesComponent}]),
    ]
})
export class PagePrefavoritesModule {
}
