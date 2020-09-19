import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import {PageCameraComponent} from './page-camera.component';
import {SharedModule} from '../../@shared/shared.module';


@NgModule({
    declarations: [PageCameraComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: PageCameraComponent}]),
    ],
})
export class PageCameraModule {
}
