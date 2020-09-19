import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import { SafeUrlPipe } from './pipes/safe-url.pipe';


@NgModule({
    declarations: [SafeUrlPipe],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
        IonicModule
    ]
})
export class SharedModule {
}
