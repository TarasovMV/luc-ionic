import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AlertController, ModalController} from '@ionic/angular';
import {ApiUserService} from '../../@core/services/api/api-user.service';
import {LoadingService} from '../../@core/services/loading.service';

@Component({
    selector: 'app-popup-change-pass',
    templateUrl: './popup-change-pass.component.html',
    styleUrls: ['./popup-change-pass.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupChangePassComponent implements OnInit {
    public form: FormGroup = new FormGroup({
        oldPass: new FormControl(''),
        newPass: new FormControl(''),
        repeatPass: new FormControl(''),
    }, [matchValidator]);

    constructor(
        private modalCtrl: ModalController,
        private apiUserService: ApiUserService,
        private loadingService: LoadingService,
        private alertController: AlertController,
    ) {}

    public ngOnInit(): void {
    }

    public back(): void {
        this.modalCtrl.dismiss().then();
    }

    public async changePass(): Promise<void> {
        this.form.markAsTouched();
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            return;
        }
        await this.loadingService.startLoading();
        const result = await this.apiUserService.refreshPassword(this.form.value.oldPass, this.form.value.newPass);
        await this.loadingService.stopLoading();
        await this.presentAlert(result);
        this.back();
    }

    private async presentAlert(result: boolean): Promise<void> {
        const message = result
            ? 'Пароль успешно изменен.'
            : 'Не удалось изменить пароль.';
        const alert = await this.alertController.create({
            header: 'Смена пароля',
            message,
            buttons: ['Понятно']
        });

        await alert.present();
    }
}

function matchValidator(group: FormGroup) {
    const values = [group.value.newPass, group.value.repeatPass];
    if (values[0] !== '' && values[0] === values[1]) {
        console.log('validate', values);
        return null;
    }
    console.log('validate error');
    return { mismatch: { message: 'Values are not equal' }};
}
