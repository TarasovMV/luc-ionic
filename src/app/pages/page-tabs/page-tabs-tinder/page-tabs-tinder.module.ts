import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTabsTinderComponent} from './page-tabs-tinder.component';
import {RouterModule} from '@angular/router';
import {PageTabsTinderCardComponent} from "./components/page-tabs-tinder-card/page-tabs-tinder-card.component";
import {SharedModule} from "../../../@shared/shared.module";


@NgModule({
    declarations: [PageTabsTinderComponent, PageTabsTinderCardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: PageTabsTinderComponent}]),
        SharedModule,
    ]
})
export class PageTabsTinderModule {
}
