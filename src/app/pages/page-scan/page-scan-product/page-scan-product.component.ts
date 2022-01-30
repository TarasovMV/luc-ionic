import {Component, Input, OnInit} from '@angular/core';
import {IPageScanProductModel} from '../../../models/page-scan.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppConfigService} from '../../../@core/services/platform/app-config.service';

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

    // public imageUrl$ = this.dataSourceShared.pipe(map(x => `${this.restUrl}/api/Photo/feed/${x.id}`));
    public imageUrl$ = this.dataSourceShared.pipe(map(x => x.imageUrl));

    public isSaleMode: Observable<boolean> =
        this.dataSource$.pipe(map(x => !!x?.oldPrice));

    private readonly restUrl: string;

    constructor(appConfig: AppConfigService) {
        this.restUrl = appConfig.fileUrl;
    }

    ngOnInit(): void {}
}
