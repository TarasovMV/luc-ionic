import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageTabsComponent} from './page-tabs.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
    },
    {
        path: '',
        component: PageTabsComponent,
        children: [
            {
                path: 'main',
                loadChildren: () => import('./page-tabs-main/page-tabs-main.module').then(m => m.PageTabsMainModule)
            },
            {
                path: 'tinder',
                loadChildren: () => import('./page-tabs-tinder/page-tabs-tinder.module').then(m => m.PageTabsTinderModule)
            },
            {
                path: 'favorites',
                loadChildren: () => import('./page-tabs-favorites/page-tabs-favorites.module').then(m => m.PageTabsFavoritesModule)
            },
            {
                path: 'user',
                loadChildren: () => import('./page-tabs-user/page-tabs-user.module').then(m => m.PageTabsUserModule)
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'main',
        pathMatch: 'full',
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageTabsRoutingModule { }
