import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPageScanProductModel} from '../../models/page-scan.model';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-page-scan',
    templateUrl: './page-scan.component.html',
    styleUrls: ['./page-scan.component.scss'],
})
export class PageScanComponent implements OnInit {

    private readonly nextRouteUrl: string = '/main/product';

    private readonly defaultProducts: IPageScanProductModel[] = new Array(6);

    private products$: BehaviorSubject<IPageScanProductModel[]> =
        new BehaviorSubject<IPageScanProductModel[]>(this.defaultProducts);

    public productsShared: Observable<IPageScanProductModel[]> =
        this.products$.asObservable();

    public isProductEmpty: Observable<boolean> =
        this.productsShared.pipe(map(x => !(x?.length > 0)));

    constructor(private router: Router, private location: Location) {
    }

    ngOnInit(): void {
        setTimeout(() => this.products$.next([]), 5000);
    }

    public async chooseProduct(product: IPageScanProductModel): Promise<void> {
        console.log('choose product', product);
        await this.router.navigateByUrl(this.nextRouteUrl);
    }

    public closePage(): void {
        this.goToPreviousRoute();
    }

    private goToPreviousRoute = (): void => {
        this.location.back();
    }

}
