import {Component, OnDestroy, OnInit} from '@angular/core';
import { RxJsUnsubscriber } from '../../../../../@core/abstractions/RxJsUnsubscriber';
import {UserInfoService} from '../../../../../@core/services/user-info.service';
import {takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {MobileShareService} from '../../../../../@core/services/platform/mobile-share.service';
import {ModalController} from '@ionic/angular';
import {PopupFeedbackComponent} from '../../../../../popups/popup-feedback/popup-feedback.component';
import {ISelectModel} from '../../../../../@shared/components/shared-select/shared-select.component';
import {IUserInfo} from '../../../../../models/user-info.model';
import {RateAppService} from '../../../../../@core/services/platform/rate-app.service';
import {PopupChangePassComponent} from '../../../../../popups/popup-change-pass/popup-change-pass.component';


@Component({
    selector: 'app-page-tabs-user-screen-auth',
    templateUrl: './page-tabs-user-screen-auth.component.html',
    styleUrls: ['./page-tabs-user-screen-auth.component.scss'],
})
export class PageTabsUserScreenAuthComponent extends RxJsUnsubscriber implements OnInit, OnDestroy {
    public userForm: FormGroup  = new FormGroup({
        gender: new FormControl(),
    });
    public readonly genderReference: ISelectModel<unknown>[];
    private currentUser: IUserInfo = null;

    constructor(
        private userService: UserInfoService,
        private shareService: MobileShareService,
        private modalController: ModalController,
        private rateAppService: RateAppService,
    ) {
        super();
        this.genderReference = Object.keys(userService.genderReference).map(x => ({value: x, title: userService.genderReference[x]}));
    }

    ngOnInit(): void {
        this.userService.authUser$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
            // TODO: replace to deepEqual
            if (!!this.currentUser && this.currentUser?.gender === user?.gender) {
                return;
            }
            this.userForm.controls.gender.setValue(user.gender);
            this.currentUser = {...user};
        });
        this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(form => {
            this.currentUser.gender = form.gender;
            this.userService.updateUser({...this.userService.authUser$.value, gender: form.gender}).then();
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    public rate(): void {
        this.rateAppService.rateUs();
    }

    public share(): void {
        this.shareService.shareApp().then();
    }

    public async openFeedback(): Promise<void> {
        await this.presentModalFeedback();
    }

    public refreshPassword(): void {
        this.presentModalRefreshPassword().then();
    }

    private async presentModalFeedback() {
        const modal = await this.modalController.create({
            component: PopupFeedbackComponent,
            componentProps: {email: this.userService.authUser$?.value?.email}
        });
        return await modal.present();
    }

    private async presentModalRefreshPassword() {
        const modal = await this.modalController.create({
            component: PopupChangePassComponent,
            componentProps: {email: this.userService.authUser$?.value?.email}
        });
        return await modal.present();
    }
}
