import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from './@core/guards/authentication.guard';

const routes: Routes = [
    {
        path: 'preview',
        loadChildren: () => import('./pages/page-preview/page-preview.module').then(m => m.PagePreviewModule),
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'user_init',
        loadChildren: () => import('./pages/page-user-init/page-user-init.module').then(m => m.PageUserInitModule)
    },
    {
        path: 'pre_favorites',
        loadChildren: () => import('./pages/page-prefavorites/page-prefavorites.module').then(m => m.PagePrefavoritesModule)
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
