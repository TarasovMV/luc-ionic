import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'preview',
        loadChildren: () => import('./pages/page-preview/page-preview.module').then(m => m.PagePreviewModule)
    },
    {
        path: 'user_init',
        loadChildren: () => import('./pages/page-user-init/page-user-init.module').then(m => m.PageUserInitModule)
    },
    {
        path: 'main',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    },
    {
        path: '**',
        redirectTo: 'preview',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: NoPreloading})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
