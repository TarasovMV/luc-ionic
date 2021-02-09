import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PopupFeedbackComponent} from '../../../../../popups/popup-feedback/popup-feedback.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingService} from '../../../../../@core/services/loading.service';
import {ApiUserService} from '../../../../../@core/services/api/api-user.service';

@Component({
    selector: 'app-page-tabs-user-screen-login',
    templateUrl: './page-tabs-user-screen-login.component.html',
    styleUrls: ['./page-tabs-user-screen-login.component.scss'],
})
export class PageTabsUserScreenLoginComponent implements OnInit {

    loginForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(3)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });

    constructor(
        private modalController: ModalController,
        private loadingService: LoadingService,
        private apiUserService: ApiUserService,
    ) {}

    ngOnInit(): void {
        this.loginForm.valueChanges.subscribe(x => console.log('form', x));
    }

    public async loginClick(): Promise<void> {
        Object.values(this.loginForm.controls).forEach(x => x.markAsDirty());
        if (!this.loginForm.valid) {
            console.warn('invalid form');
            return;
        }
        const res = await this.apiUserService.userLogin(this.loginForm.value);
        this.loadingService.stopLoading().then();
        console.log('login status', res);
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
}
