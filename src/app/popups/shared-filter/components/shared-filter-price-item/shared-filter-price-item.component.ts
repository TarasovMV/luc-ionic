import {Component, Input, OnInit} from '@angular/core';
import {ISharedFilterPrice} from '../../../../models/shared-filter.model';

@Component({
    selector: 'app-shared-filter-price-item',
    templateUrl: './shared-filter-price-item.component.html',
    styleUrls: ['./shared-filter-price-item.component.scss'],
})
export class SharedFilterPriceItemComponent implements OnInit {

    @Input() data: ISharedFilterPrice = null;
    @Input() isActive: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

}
