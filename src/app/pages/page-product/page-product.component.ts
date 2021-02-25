import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {IPageProductModel} from '../../models/page-product.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {DATA_SOURCE} from './page-product.mock';
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-page-product',
    templateUrl: './page-product.component.html',
    styleUrls: ['./page-product.component.scss'],
})
export class PageProductComponent implements OnInit {

    private data: BehaviorSubject<IPageProductModel> = new BehaviorSubject<IPageProductModel>(null);
    public sharedData: Observable<IPageProductModel> = this.data.asObservable();

    constructor(
        private location: Location,
        private modalCtrl: ModalController,
    ) {}

    public ngOnInit(): void {
        setTimeout(() => this.data.next(DATA_SOURCE), 3000);
    }

    public async closePage(): Promise<void> {
        await this.modalCtrl.dismiss();
    }
}
