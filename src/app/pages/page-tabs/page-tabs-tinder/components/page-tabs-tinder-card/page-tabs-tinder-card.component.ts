import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavController} from '@ionic/angular';
import {urlToDataUrl} from '../../../../../@shared/functions/base64-file.function';
import {LoadingService} from '../../../../../@core/services/loading.service';

@Component({
    selector: 'app-page-tabs-tinder-card',
    templateUrl: './page-tabs-tinder-card.component.html',
    styleUrls: ['./page-tabs-tinder-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsTinderCardComponent implements OnInit {

    @Input() private set data(method: () => Promise<any>) {
        this.disableInfo();
        method().then((res) => this.data$.next(res));
    }
    public data$ = new BehaviorSubject(null);
    public isInfo$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private readonly nextRouteUrl = '/main/camera';

    constructor(
        private navCtrl: NavController,
        private loadingService: LoadingService,
    ) {}

    ngOnInit(): void {}

    public toggleInfo(): void {
        this.isInfo$.next(!this.isInfo$.value);
    }

    public async search(): Promise<void> {
        if (!this.data$.getValue()) {
            return;
        }
        await this.loadingService.startLoading();
        const img = await urlToDataUrl(this.data$.value.url);
        await this.loadingService.stopLoading();
        await this.navCtrl.navigateForward(this.nextRouteUrl, {queryParams: { img }});
    }

    private disableInfo(): void {
        this.isInfo$.next(false);
    }
}
