import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IPageProductInfoModel} from '../../../models/page-product.model';

@Component({
    selector: 'app-page-product-info',
    templateUrl: './page-product-info.component.html',
    styleUrls: ['./page-product-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageProductInfoComponent implements OnInit {

    @Input() data: IPageProductInfoModel[] = null;

    constructor() {
    }

    public ngOnInit(): void {}
}
