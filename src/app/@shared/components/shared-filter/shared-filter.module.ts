import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedFilterComponent} from './shared-filter.component';
import {AngularSvgIconModule} from 'angular-svg-icon';


@NgModule({
    declarations: [SharedFilterComponent],
    imports: [
        CommonModule,
        AngularSvgIconModule.forRoot(),
    ]
})
export class SharedFilterModule {
}
