import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPageScanProductModel} from '../../models/page-scan.model';
import {map} from 'rxjs/operators';
import {ModalController, NavController, Platform} from '@ionic/angular';
import {SharedFilterComponent} from '../../popups/shared-filter/shared-filter.component';
import {PageProductComponent} from '../page-product/page-product.component';
import {RecognitionInfoService} from '../../@core/services/recognition-info.service';
import {ApiRecognitionService} from '../../@core/services/api/api-recognition.service';
import {BackButtonService} from '../../@core/services/platform/back-button.service';


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

    private searchId: number;
    private savedFilter: any;

    constructor(
        private navCtrl: NavController,
        private modalController: ModalController,
        private recognitionInfoService: RecognitionInfoService,
        private apiRecognitionService: ApiRecognitionService,
        private platform: Platform,
        private backButtonService: BackButtonService,
    ) {
    }

    public ngOnInit(): void {
        this.getData().then();
    }

    public async chooseProduct(product: IPageScanProductModel): Promise<void> {
        if (!product) {
            return;
        }
        this.recognitionInfoService.recognitionFeedFunction = () => this.apiRecognitionService.getFullItem(product.id);
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
        this.searchId = res?.searchId;
    }

    private async presentModalFilter() {
        const modal = await this.modalController.create({
            component: SharedFilterComponent,
            componentProps: {searchId: this.searchId, savedValue: this.savedFilter}
        });
        modal.onDidDismiss().then((res) => {
            if (!res?.data) {
                return;
            }
            this.savedFilter = res.data.init;
            this.searchByFilter(res.data);
        });
        return await modal.present();
    }

    private async presentModalInfo() {
        const modal = await this.modalController.create({
            component: PageProductComponent,
        });
        modal.onDidDismiss().then(() => {
            this.backButtonService.clearOnRoot();
            this.backButtonService.default();
        });
        return await modal.present();
    }

    private goToPreviousRoute = (): void => {
        this.navCtrl.back();
    }

    private searchByFilter(filter: any): void {
        this.products$.next(this.defaultProducts);
        console.log('filter', filter);
        this.apiRecognitionService.searchByFilter(this.searchId, filter).subscribe(res => {
            this.products$.next(this.mapProducts(res));
        });
    }

    private mapProducts(data: IPageScanProductModel[]): IPageScanProductModel[] {
        data?.forEach(x => x.category = x?.type?.split('/').reverse()[0]);
        return data ?? [];
    }
}
