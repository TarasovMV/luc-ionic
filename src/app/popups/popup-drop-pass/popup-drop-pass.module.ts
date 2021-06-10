import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopupDropPassComponent} from './popup-drop-pass.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {SharedModule} from '../../@shared/shared.module';


@NgModule({
    declarations: [PopupDropPassComponent],
    imports: [
        CommonModule,
        AngularSvgIconModule.forRoot(),
        SharedModule,
    ]
})
export class PopupDropPassModule {
}
