import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [SafeUrlPipe],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule.forRoot(),
    ],
    exports: [
        IonicModule,
        AngularSvgIconModule,
        HttpClientModule,
    ]
})
export class SharedModule {
}
