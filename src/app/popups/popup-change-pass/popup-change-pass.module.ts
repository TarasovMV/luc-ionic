import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopupChangePassComponent} from './popup-change-pass.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {SharedModule} from '../../@shared/shared.module';


@NgModule({
    declarations: [PopupChangePassComponent],
    imports: [
        CommonModule,
        AngularSvgIconModule.forRoot(),
        SharedModule,
    ]
})
export class PopupChangePassModule {
}
