import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {PageCameraChoosePageRoutingModule} from './page-camera-choose-routing.module';
import {PageCameraChoosePage} from './page-camera-choose.page';
import {SharedModule} from '../../@shared/shared.module';
import {PageCameraChooseButtonComponent} from './page-camera-choose-button/page-camera-choose-button.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PageCameraChoosePageRoutingModule,
        SharedModule,
    ],
    declarations: [PageCameraChoosePage, PageCameraChooseButtonComponent]
})
export class PageCameraChoosePageModule {
}
