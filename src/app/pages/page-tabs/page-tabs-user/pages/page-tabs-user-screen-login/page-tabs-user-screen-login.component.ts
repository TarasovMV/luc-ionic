import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PopupFeedbackComponent} from '../../../../../popups/popup-feedback/popup-feedback.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

    public set email(value: string) {
        this.loginForm.get('email').setValue(value);
    }
    public get email(): string {
        return this.loginForm.get('email').value;
    }

    public set password(value: string) {
        this.loginForm.get('password').setValue(value);
    }
    public get password(): string {
        return this.loginForm.get('password').value;
    }

    constructor(
        private modalController: ModalController,
    ) {}

    ngOnInit(): void {
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
