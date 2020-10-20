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
                path: 'scan',
                loadChildren: () => import('../pages/page-scan/page-scan.module').then(m => m.PageScanModule),
            },
            {
                path: 'product',
                loadChildren: () => import('../pages/page-product/page-product.module').then(m => m.PageProductModule),
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
