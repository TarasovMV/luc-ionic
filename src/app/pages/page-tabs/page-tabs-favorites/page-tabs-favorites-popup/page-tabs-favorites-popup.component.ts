import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {animate, style, transition, trigger} from '@angular/animations';
import {urlToDataUrl} from '../../../../@shared/functions/base64-file.function';
import {StatusBarService} from '../../../../@core/services/platform/status-bar.service';

@Component({
    selector: 'app-page-tabs-favorites-popup',
    templateUrl: './page-tabs-favorites-popup.component.html',
    styleUrls: ['./page-tabs-favorites-popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('enterTrigger', [
            transition('void => *', [
                style({opacity: 0}),
                animate('300ms', style({opacity: 1}))
            ]),
            transition('* => void', [
                style({opacity: 1}),
                animate('300ms', style({opacity: 0}))
            ]),
        ])
    ],
})
export class PageTabsFavoritesPopupComponent implements OnInit, OnDestroy {

    private readonly nextRouteUrl = '/main/camera';
    // TODO: add getting src
    public readonly imgSrc: string =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4cXilLqWd8tskKFoG040zVnSymkScPPq_OQ&usqp=CAU';
    public isInterface$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private isSetDefault: boolean = true;

    constructor(
        private statusBarService: StatusBarService,
        private modalController: ModalController,
        private navCtrl: NavController,
    ) {}

    ngOnInit(): void {
        this.statusBarService.hide().then();
    }

    async ngOnDestroy(): Promise<void> {
        if (!this.isSetDefault) {
            return;
        }
        await this.statusBarService.setDefault();
    }

    public switchVisible(): void {
        this.isInterface$.next(!this.isInterface$.value);
    }

    public async close(event: MouseEvent): Promise<void> {
        event.stopPropagation();
        await this.closeModal();
    }

    public async search(event: MouseEvent): Promise<void> {
        event.stopPropagation();
        const img = await urlToDataUrl(this.imgSrc);
        this.isSetDefault = false;
        await this.navCtrl.navigateForward(this.nextRouteUrl, {queryParams: { img }});
        await this.closeModal();
    }

    private async closeModal(): Promise<void> {
        await this.modalController.dismiss();
    }
}
