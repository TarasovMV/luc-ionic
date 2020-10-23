import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedFilterComponent} from './shared-filter.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {SharedFilterMenuItemComponent} from './components/shared-filter-menu-item/shared-filter-menu-item.component';


@NgModule({
    declarations: [
        SharedFilterComponent,
        SharedFilterMenuItemComponent,
    ],
    imports: [
        CommonModule,
        AngularSvgIconModule.forRoot(),
    ]
})
export class SharedFilterModule {
}
