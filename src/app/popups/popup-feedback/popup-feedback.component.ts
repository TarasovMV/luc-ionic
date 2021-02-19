import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-popup-feedback',
    templateUrl: './popup-feedback.component.html',
    styleUrls: ['./popup-feedback.component.scss'],
})
export class PopupFeedbackComponent implements OnInit {
    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    email: string = '';

    constructor(
        private modalCtrl: ModalController,
        private alertController: AlertController,
    ) {}

    ngOnInit(): void {
        this.form.get('email').setValue(this.email);
    }

    public async close(): Promise<void> {
        await this.modalCtrl.dismiss();
    }

    public send(): void {
        this.presentAlert().then();
        this.close().then();
    }

    private async presentAlert(): Promise<void> {
        const alert = await this.alertController.create({
            header: 'Спасибо за обращение',
            message: 'Мы обязательно прочитаем Ваше сообщение и сделаем выводы.',
            buttons: ['Понятно']
        });

        await alert.present();
    }
}
