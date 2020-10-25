import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {SharedButtonComponent} from './components/shared-button/shared-button.component';
import {SharedFilterModule} from '../popups/shared-filter/shared-filter.module';
registerLocaleData(localeFr);


@NgModule({
    declarations: [
        SafeUrlPipe,
        SharedButtonComponent,
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
        SharedButtonComponent,
    ]
})
export class SharedModule {
}
