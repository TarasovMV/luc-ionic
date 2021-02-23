import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiUserService} from '../../@core/services/api/api-user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {IFeedbackTheme} from '../../models/feedback.model';
import {ISelectModel} from '../../@shared/components/shared-select/shared-select.component';
import {map} from 'rxjs/operators';
import {LoadingService} from '../../@core/services/loading.service';
import {UserInfoService} from '../../@core/services/user-info.service';

@Component({
    selector: 'app-popup-feedback',
    templateUrl: './popup-feedback.component.html',
    styleUrls: ['./popup-feedback.component.scss'],
})
export class PopupFeedbackComponent implements OnInit {
    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        feedbackCategory: new FormControl(null, [Validators.required]),
        message: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    email: string = '';

    private themes$: BehaviorSubject<IFeedbackTheme[]> = new BehaviorSubject<IFeedbackTheme[]>([]);
    public selectionThemes$: Observable<ISelectModel<IFeedbackTheme>[]> = this.themes$.asObservable().pipe(
        map(x => x.map(item => ({value: item, title: item.nameRus}))),
    );

    constructor(
        private userService: UserInfoService,
        private loadingService: LoadingService,
        private apiUserService: ApiUserService,
        private modalCtrl: ModalController,
        private alertController: AlertController,
    ) {}

    ngOnInit(): void {
        this.form.get('email').setValue(this.email);
        this.getThemes().then();
        this.form.valueChanges.subscribe(x => console.log(x));
    }

    public async close(): Promise<void> {
        await this.modalCtrl.dismiss();
    }

    public async send(): Promise<void> {
        this.form.markAsDirty();
        if (!this.form.valid) {
            return;
        }
        const userId = this.userService.authUser$?.getValue()?.id ?? 0;
        const formData = { ...this.form.value, userId };
        await this.loadingService.startLoading();
        await this.apiUserService.sendReport(formData);
        await this.loadingService.stopLoading();
        await this.presentAlert();
        await this.close();
    }

    private async getThemes(): Promise<void> {
        const themes = await this.apiUserService.getReportReference();
        this.themes$.next(themes);
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
