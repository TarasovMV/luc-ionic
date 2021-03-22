import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPageProductPreviewModel} from '../../../models/page-product.model';

@Component({
    selector: 'app-page-product-price',
    templateUrl: './page-product-price.component.html',
    styleUrls: ['./page-product-price.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageProductPriceComponent implements OnInit {

    @Input() data: IPageProductPreviewModel = null;
    @Output() favouriteClick: EventEmitter<unknown> = new EventEmitter<unknown>();

    constructor() {
    }

    public ngOnInit(): void {
    }

    public favouriteClickButton(): void {
        this.favouriteClick.emit();
    }
}
