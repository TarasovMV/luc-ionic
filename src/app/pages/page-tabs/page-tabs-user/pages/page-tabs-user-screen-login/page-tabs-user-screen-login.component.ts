import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PopupFeedbackComponent} from '../../../../../popups/popup-feedback/popup-feedback.component';

@Component({
    selector: 'app-page-tabs-user-screen-login',
    templateUrl: './page-tabs-user-screen-login.component.html',
    styleUrls: ['./page-tabs-user-screen-login.component.scss'],
})
export class PageTabsUserScreenLoginComponent implements OnInit {

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
