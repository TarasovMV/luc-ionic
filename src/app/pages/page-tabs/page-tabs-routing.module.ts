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
