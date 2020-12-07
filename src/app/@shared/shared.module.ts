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
import {SharedInputComponent} from "./components/shared-input/shared-input.component";
import {SharedMultiplyCheckerComponent} from "./components/shared-multiply-checker/shared-multiply-checker.component";
import {SharedSelectComponent} from "./components/shared-select/shared-select.component";
import {SharedTextareaComponent} from "./components/shared-textarea/shared-textarea.component";
registerLocaleData(localeFr);


@NgModule({
    declarations: [
        SafeUrlPipe,
        SharedButtonComponent,
        SharedInputComponent,
        SharedMultiplyCheckerComponent,
        SharedSelectComponent,
        SharedTextareaComponent,
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
        SharedInputComponent,
        SharedMultiplyCheckerComponent,
        SharedSelectComponent,
        SharedTextareaComponent,
    ]
})
export class SharedModule {
}
