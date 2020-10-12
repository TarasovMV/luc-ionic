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
                path: 'tabs',
                loadChildren: () => import('../pages/page-tabs/page-tabs.module').then(m => m.PageTabsModule),
            },
            {
                path: '**',
                redirectTo: 'tabs',
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
