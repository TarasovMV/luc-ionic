import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PageCameraChoosePage} from './page-camera-choose.page';

const routes: Routes = [
    {
        path: '',
        component: PageCameraChoosePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PageCameraChoosePageRoutingModule {
}
