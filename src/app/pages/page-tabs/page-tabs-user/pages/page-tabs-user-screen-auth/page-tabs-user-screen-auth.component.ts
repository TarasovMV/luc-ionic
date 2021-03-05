import {Component, OnDestroy, OnInit} from '@angular/core';
import { RxJsUnsubscriber } from '../../../../../@core/abstractions/RxJsUnsubscriber';
import {UserInfoService} from '../../../../../@core/services/user-info.service';
import {takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {MobileShareService} from '../../../../../@core/services/platform/mobile-share.service';
import {ModalController} from '@ionic/angular';
import {PopupFeedbackComponent} from '../../../../../popups/popup-feedback/popup-feedback.component';

@Component({
    selector: 'app-page-tabs-user-screen-auth',
    templateUrl: './page-tabs-user-screen-auth.component.html',
    styleUrls: ['./page-tabs-user-screen-auth.component.scss'],
})
export class PageTabsUserScreenAuthComponent extends RxJsUnsubscriber implements OnInit, OnDestroy {
    public userForm: FormGroup;

    constructor(
        private userService: UserInfoService,
        private shareService: MobileShareService,
        private modalController: ModalController,
    ) {
        super();
    }

    ngOnInit(): void {
        this.userService.authUser$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            this.userForm = new FormGroup({
                gender: new FormControl(),
                city: new FormControl(),
            });
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    public share(): void {
        this.shareService.shareData(
            'LUC',
            'Try to use it!'
        );
    }

    public async openFeedback(): Promise<void> {
        await this.presentModalFeedback();
    }

    private async presentModalFeedback() {
        const modal = await this.modalController.create({
            component: PopupFeedbackComponent,
            componentProps: {email: this.userService.authUser$?.value?.email}
        });
        return await modal.present();
    }
}
