import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import {PageCameraComponent} from './page-camera.component';
import {SharedModule} from '../../@shared/shared.module';
import {PageCameraDotComponent} from "./components/page-camera-dot/page-camera-dot.component";


@NgModule({
    declarations: [PageCameraComponent, PageCameraDotComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: PageCameraComponent}]),
    ],
})
export class PageCameraModule {
}
