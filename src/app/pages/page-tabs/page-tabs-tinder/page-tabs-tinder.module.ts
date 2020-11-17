import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTabsTinderComponent} from './page-tabs-tinder.component';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [PageTabsTinderComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: PageTabsTinderComponent}]),
    ]
})
export class PageTabsTinderModule {
}
