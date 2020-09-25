import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'camera',
                loadChildren: () => import('../pages/page-camera/page-camera.module').then(m => m.PageCameraModule),
            },
            {
                path: '**',
                redirectTo: 'camera',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
