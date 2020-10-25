import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedFilterComponent} from './shared-filter.component';
import {SharedFilterMenuItemComponent} from './components/shared-filter-menu-item/shared-filter-menu-item.component';
import {SharedModule} from '../../@shared/shared.module';
import {SharedFilterColorItemComponent} from './components/shared-filter-color-item/shared-filter-color-item.component';


@NgModule({
    declarations: [
        SharedFilterComponent,
        SharedFilterMenuItemComponent,
        SharedFilterColorItemComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
    ]
})
export class SharedFilterModule {
}
