import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ISharedFilterBrand} from '../../../../models/shared-filter.model';

@Component({
    selector: 'app-shared-filter-brand-item',
    templateUrl: './shared-filter-brand-item.component.html',
    styleUrls: ['./shared-filter-brand-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedFilterBrandItemComponent implements OnInit {

    @Input() data: ISharedFilterBrand = null;

    constructor() {
    }

    ngOnInit(): void {
    }
}
