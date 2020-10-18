import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {SharedButtonMainComponent} from './components/shared-button-main/shared-button-main.component';
import {SharedButtonSubComponent} from './components/shared-button-sub/shared-button-sub.component';
registerLocaleData(localeFr);


@NgModule({
    declarations: [
        SafeUrlPipe,
        SharedButtonMainComponent,
        SharedButtonSubComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule.forRoot(),
    ],
    exports: [
        IonicModule,
        AngularSvgIconModule,
        HttpClientModule,
        SharedButtonMainComponent,
    ]
})
export class SharedModule {
}
