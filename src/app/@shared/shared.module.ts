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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedFormErrorComponent} from './components/shared-form-error/shared-form-error.component';
import {SharedImageSliderComponent} from './components/shared-image-slider/shared-image-slider.component';
import { CategorySplitPipe } from './pipes/category-split.pipe';
registerLocaleData(localeFr);


@NgModule({
    declarations: [
        SafeUrlPipe,
        SharedButtonComponent,
        SharedInputComponent,
        SharedMultiplyCheckerComponent,
        SharedSelectComponent,
        SharedTextareaComponent,
        SharedFormErrorComponent,
        SharedImageSliderComponent,
        CategorySplitPipe,
    ],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
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
        SharedFormErrorComponent,
        SharedImageSliderComponent,
        SafeUrlPipe,
        CategorySplitPipe,
    ]
})
export class SharedModule {
}
