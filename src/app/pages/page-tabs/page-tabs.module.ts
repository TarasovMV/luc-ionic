import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PageTabsRoutingModule} from './page-tabs-routing.module';
import {PageTabsComponent} from './page-tabs.component';
import {SharedModule} from '../../@shared/shared.module';


@NgModule({
    declarations: [PageTabsComponent],
    imports: [
        CommonModule,
        SharedModule,
        PageTabsRoutingModule
    ]
})
export class PageTabsModule {
}
