import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopupFeedbackComponent} from './popup-feedback.component';
import {SharedModule} from '../../@shared/shared.module';


@NgModule({
    declarations: [PopupFeedbackComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class PopupFeedbackModule {
}
