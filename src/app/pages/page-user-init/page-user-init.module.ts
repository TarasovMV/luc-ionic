import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageUserInitComponent} from './page-user-init.component';
import {SharedModule} from '../../@shared/shared.module';
import {RouterModule} from '@angular/router';
import {PageUserInitRoundButtonComponent} from './page-user-init-round-button/page-user-init-round-button.component';


@NgModule({
    declarations: [PageUserInitComponent, PageUserInitRoundButtonComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: PageUserInitComponent}]),
    ]
})
export class PageUserInitModule {
}
