import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPageScanProductModel} from '../../models/page-scan.model';
import {Location} from '@angular/common';
import {map} from 'rxjs/operators';
import {DATA_SOURCE} from './page-scan.mock';
import {ModalController, NavController} from '@ionic/angular';
import {SharedFilterComponent} from '../../@shared/components/shared-filter/shared-filter.component';

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

    constructor(
        private navCtrl: NavController,
        private location: Location,
        private modalController: ModalController,
    ) {
    }

    public ngOnInit(): void {
        setTimeout(() => this.products$.next(DATA_SOURCE.products), 5000);
    }

    public async chooseProduct(product: IPageScanProductModel): Promise<void> {
        if (!product) {
            return;
        }
        await this.navCtrl.navigateRoot(this.nextRouteUrl);
    }

    public closePage(): void {
        this.goToPreviousRoute();
    }

    public async openFilter(): Promise<void> {
        await this.presentModalFilter();
    }

    private async presentModalFilter() {
        const modal = await this.modalController.create({
            component: SharedFilterComponent,
        });
        return await modal.present();
    }

    private goToPreviousRoute = (): void => {
        this.location.back();
    }
}
