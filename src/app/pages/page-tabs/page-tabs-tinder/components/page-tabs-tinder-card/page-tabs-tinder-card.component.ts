import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavController} from '@ionic/angular';
import {urlToDataUrl} from '../../../../../@shared/functions/base64-file.function';

@Component({
    selector: 'app-page-tabs-tinder-card',
    templateUrl: './page-tabs-tinder-card.component.html',
    styleUrls: ['./page-tabs-tinder-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsTinderCardComponent implements OnInit {

    @Input() private set imgSrc(value: string) {
        this.disableInfo();
        this._imgSrc = value;
    }
    _imgSrc: string;
    isInfo$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private readonly nextRouteUrl = '/main/camera';

    constructor(
        private navCtrl: NavController,
    ) {}

    ngOnInit(): void {}

    public toggleInfo(): void {
        this.isInfo$.next(!this.isInfo$.value);
    }

    public async search(): Promise<void> {
        const img = await urlToDataUrl(this._imgSrc);
        console.log(img);
        await this.navCtrl.navigateForward(this.nextRouteUrl, {queryParams: { img }});
    }

    private disableInfo(): void {
        this.isInfo$.next(false);
    }
}
