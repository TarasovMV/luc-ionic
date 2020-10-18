import {Component, Input, OnInit} from '@angular/core';
import {IPageScanProductModel} from '../../../models/page-scan.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-page-scan-product',
    templateUrl: './page-scan-product.component.html',
    styleUrls: ['./page-scan-product.component.scss'],
})
export class PageScanProductComponent implements OnInit {

    @Input() set data(value: IPageScanProductModel) {
        this.dataSource$.next(value);
    }

    private dataSource$: BehaviorSubject<IPageScanProductModel> =
        new BehaviorSubject<IPageScanProductModel>(null);

    public dataSourceShared: Observable<IPageScanProductModel> =
        this.dataSource$.asObservable();

    public isSaleMode: Observable<boolean> =
        this.dataSource$.pipe(map(x => !!x?.oldPrice));

    constructor() {
    }

    ngOnInit() {
    }

}
