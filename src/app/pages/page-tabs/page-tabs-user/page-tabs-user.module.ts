import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTabsUserComponent} from './page-tabs-user.component';
import {RouterModule} from '@angular/router';
import {PageTabsUserRegbuttonComponent} from './components/page-tabs-user-regbutton/page-tabs-user-regbutton.component';
import {SharedModule} from '../../../@shared/shared.module';
import {PageTabsUserOutsourceComponent} from './components/page-tabs-user-outsource/page-tabs-user-outsource.component';
import {PageTabsUserMenuComponent} from './components/page-tabs-user-menu/page-tabs-user-menu.component';
import {PageTabsUserScreenLoginComponent} from "./pages/page-tabs-user-screen-login/page-tabs-user-screen-login.component";
import {PageTabsUserScreenRegComponent} from "./pages/page-tabs-user-screen-reg/page-tabs-user-screen-reg.component";
import {PopupFeedbackModule} from "../../../popups/popup-feedback/popup-feedback.module";
import {PageTabsUserScreenAuthComponent} from "./pages/page-tabs-user-screen-auth/page-tabs-user-screen-auth.component";
import {PopupChangePassModule} from '../../../popups/popup-change-pass/popup-change-pass.module';
import {PopupDropPassModule} from '../../../popups/popup-drop-pass/popup-drop-pass.module';


@NgModule({
    declarations: [
        PageTabsUserComponent,
        PageTabsUserRegbuttonComponent,
        PageTabsUserOutsourceComponent,
        PageTabsUserMenuComponent,
        PageTabsUserScreenLoginComponent,
        PageTabsUserScreenRegComponent,
        PageTabsUserScreenAuthComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        PopupFeedbackModule,
        PopupChangePassModule,
        PopupDropPassModule,
        RouterModule.forChild([{path: '', component: PageTabsUserComponent}]),
    ]
})
export class PageTabsUserModule {
}
