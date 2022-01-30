import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedFilterComponent} from './shared-filter.component';
import {SharedFilterMenuItemComponent} from './components/shared-filter-menu-item/shared-filter-menu-item.component';
import {SharedModule} from '../../@shared/shared.module';
import {SharedFilterColorItemComponent} from './components/shared-filter-color-item/shared-filter-color-item.component';
import {SharedFilterBrandItemComponent} from './components/shared-filter-brand-item/shared-filter-brand-item.component';
import {SharedFilterPriceItemComponent} from './components/shared-filter-price-item/shared-filter-price-item.component';
import {SharedFilterSearchComponent} from './components/shared-filter-search/shared-filter-search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSliderModule} from '@angular-slider/ngx-slider';


@NgModule({
    declarations: [
        SharedFilterComponent,
        SharedFilterMenuItemComponent,
        SharedFilterColorItemComponent,
        SharedFilterBrandItemComponent,
        SharedFilterPriceItemComponent,
        SharedFilterSearchComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        NgxSliderModule,
    ]
})
export class SharedFilterModule {
}
