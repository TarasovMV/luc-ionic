import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPageScanProductModel} from '../../models/page-scan.model';
import {Location} from '@angular/common';
import {map} from 'rxjs/operators';
import {DATA_SOURCE} from './page-scan.mock';
import {ModalController, NavController} from '@ionic/angular';
import {SharedFilterComponent} from '../../popups/shared-filter/shared-filter.component';
import {PageProductComponent} from "../page-product/page-product.component";
import {RecognitionInfoService} from "../../@core/services/recognition-info.service";

@Component({
    selector: 'app-page-scan',
    templateUrl: './page-scan.component.html',
    styleUrls: ['./page-scan.component.scss'],
})
export class PageScanComponent implements OnInit {
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
        private recognitionInfoService: RecognitionInfoService,
    ) {
    }

    public ngOnInit(): void {
        this.getData().then();
        this.presentModalInfo();
    }

    public async chooseProduct(product: IPageScanProductModel): Promise<void> {
        if (!product) {
            return;
        }
        await this.presentModalInfo();
    }

    public closePage(): void {
        this.goToPreviousRoute();
    }

    public async openFilter(): Promise<void> {
        await this.presentModalFilter();
    }

    private async getData(): Promise<void> {
        const res = await this.recognitionInfoService.recognitionSaveFunction?.();
        res?.previews?.forEach(x => x.category = x?.type?.split('/').reverse()[0]);
        this.products$.next(res?.previews ?? []);
    }

    private async presentModalFilter() {
        const modal = await this.modalController.create({
            component: SharedFilterComponent,
        });
        return await modal.present();
    }

    private async presentModalInfo() {
        const modal = await this.modalController.create({
            component: PageProductComponent,
        });
        return await modal.present();
    }

    private goToPreviousRoute = (): void => {
        this.location.back();
    }
}
