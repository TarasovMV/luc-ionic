import {Component, OnInit} from '@angular/core';
import {IPageProductModel} from '../../models/page-product.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {RecognitionInfoService} from '../../@core/services/recognition-info.service';

@Component({
    selector: 'app-page-product',
    templateUrl: './page-product.component.html',
    styleUrls: ['./page-product.component.scss'],
})
export class PageProductComponent implements OnInit {

    private data: BehaviorSubject<IPageProductModel> = new BehaviorSubject<IPageProductModel>(null);
    public sharedData: Observable<IPageProductModel> = this.data.asObservable();

    constructor(
        public modalCtrl: ModalController,
        private recognitionInfoService: RecognitionInfoService,
    ) {}

    public async ngOnInit(): Promise<void> {
        const res = await this.recognitionInfoService.recognitionFeedFunction?.();
        res.infoList = res.infoList ?? [];
        this.data.next(res);
    }

    public async closePage(): Promise<void> {
        await this.modalCtrl.dismiss();
    }
}
