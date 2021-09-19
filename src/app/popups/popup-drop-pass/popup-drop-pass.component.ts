import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {FormControl, Validators} from '@angular/forms';
import {ApiUserService} from '../../@core/services/api/api-user.service';
import {LoadingService} from '../../@core/services/loading.service';
import {BackButtonService} from '../../@core/services/platform/back-button.service';

@Component({
    selector: 'app-popup-drop-pass',
    templateUrl: './popup-drop-pass.component.html',
    styleUrls: ['./popup-drop-pass.component.scss'],
})
export class PopupDropPassComponent implements OnInit {

    public email: FormControl = new FormControl('', [Validators.required, Validators.email]);

    constructor(
        private modalCtrl: ModalController,
        private apiUserService: ApiUserService,
        private loadingService: LoadingService,
        private alertController: AlertController,
        private backButtonService: BackButtonService,
    ) {
    }

    public ngOnInit(): void {
        this.backButtonService.actionOnBack(() => this.back(), false);
    }

    public back(): void {
        this.modalCtrl.dismiss().then();
    }

    public  async dropPass(): Promise<void> {
        this.email.markAsTouched();
        if (!this.email.valid) {
            return;
        }
        await this.loadingService.startLoading();
        const result = await this.apiUserService.dropPassword(this.email.value);
        console.log('dropPass', result);
        await this.loadingService.stopLoading();
        await this.presentAlert(result);
        this.back();
    }

    private async presentAlert(result: boolean): Promise<void> {
        const message = result
            ? 'Новый пароль был отправлен на вашу почту.'
            : 'Не удалось сбросить пароль.';
        const alert = await this.alertController.create({
            header: 'Сброс пароля',
            message,
            buttons: ['Понятно']
        });

        await alert.present();
    }
}
