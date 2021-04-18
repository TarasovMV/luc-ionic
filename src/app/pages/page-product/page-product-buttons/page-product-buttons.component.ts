import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;

import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-page-product-buttons',
    templateUrl: './page-product-buttons.component.html',
    styleUrls: ['./page-product-buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageProductButtonsComponent implements OnInit {

    private readonly mainScreenUrl: string = '/main';
    @Input() shopUrl: string = null;
    @Input() modalController: ModalController = null;

    constructor(
        private navCtrl: NavController
    ) {
    }

    public ngOnInit(): void {
    }

    public async goToMainScreen(): Promise<void> {
        await this.navCtrl.navigateRoot(this.mainScreenUrl);
        await this.modalController?.dismiss();
    }

    public async openShopUrl(): Promise<void> {
        await Browser.open({url: this.shopUrl});
    }

}
