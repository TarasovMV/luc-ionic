import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PopupFeedbackComponent} from '../../../../../popups/popup-feedback/popup-feedback.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingService} from '../../../../../@core/services/loading.service';
import {ApiUserService} from '../../../../../@core/services/api/api-user.service';
import {UserInfoService} from '../../../../../@core/services/user-info.service';
import {MobileShareService} from '../../../../../@core/services/platform/mobile-share.service';
import {RateAppService} from '../../../../../@core/services/platform/rate-app.service';
import {PopupDropPassComponent} from '../../../../../popups/popup-drop-pass/popup-drop-pass.component';
import {AnalyticService} from '../../../../../@core/services/analytic.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-page-tabs-user-screen-login',
    templateUrl: './page-tabs-user-screen-login.component.html',
    styleUrls: ['./page-tabs-user-screen-login.component.scss'],
})
export class PageTabsUserScreenLoginComponent implements OnInit {

    public loginForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(3)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
    public isLoginError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private modalController: ModalController,
        private loadingService: LoadingService,
        private apiUserService: ApiUserService,
        private userService: UserInfoService,
        private shareService: MobileShareService,
        private rateAppService: RateAppService,
        private analyticService: AnalyticService,
    ) {}

    ngOnInit(): void {
        this.loginForm.valueChanges.subscribe(x => this.isLoginError.next(false));
    }

    public async loginClick(): Promise<void> {
        Object.values(this.loginForm.controls).forEach(x => x.markAsDirty());
        if (!this.loginForm.valid) {
            console.warn('invalid form');
            return;
        }
        await this.loadingService.startLoading();
        const res = await this.apiUserService.userLogin(this.loginForm.value);
        this.loadingService.stopLoading().then();
        if (!res) {
            this.isLoginError.next(true);
            return;
        }
        this.userService.setUser(res);
        this.analyticService.log('login', {email: this.loginForm.value.email});
    }

    public rate(): void {
        this.rateAppService.rateUs();
    }

    public share(): void {
        this.shareService.shareApp().then();
    }

    public async refreshPassword(): Promise<void> {
        await this.presentModalChangePass();
    }

    public async openFeedback(): Promise<void> {
        await this.presentModalFeedback();
    }

    private async presentModalFeedback() {
        const modal = await this.modalController.create({
            component: PopupFeedbackComponent,
        });
        return await modal.present();
    }

    private async presentModalChangePass() {
        const modal = await this.modalController.create({
            component: PopupDropPassComponent,
        });
        return await modal.present();
    }
}
