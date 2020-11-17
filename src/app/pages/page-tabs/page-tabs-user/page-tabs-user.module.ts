import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTabsUserComponent} from './page-tabs-user.component';
import {RouterModule} from '@angular/router';
import {PageTabsUserRegbuttonComponent} from './components/page-tabs-user-regbutton/page-tabs-user-regbutton.component';
import {SharedModule} from '../../../@shared/shared.module';
import {PageTabsUserOutsourceComponent} from './components/page-tabs-user-outsource/page-tabs-user-outsource.component';
import {PageTabsUserMenuComponent} from './components/page-tabs-user-menu/page-tabs-user-menu.component';


@NgModule({
    declarations: [
        PageTabsUserComponent,
        PageTabsUserRegbuttonComponent,
        PageTabsUserOutsourceComponent,
        PageTabsUserMenuComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: PageTabsUserComponent}]),
    ]
})
export class PageTabsUserModule {
}
