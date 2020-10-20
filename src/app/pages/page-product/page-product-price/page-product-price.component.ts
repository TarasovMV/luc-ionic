import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IPageProductPriceModel} from '../../../models/page-product.model';

@Component({
    selector: 'app-page-product-price',
    templateUrl: './page-product-price.component.html',
    styleUrls: ['./page-product-price.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageProductPriceComponent implements OnInit {

    @Input() data: IPageProductPriceModel = null;

    constructor() {
    }

    public ngOnInit(): void {
    }
}
