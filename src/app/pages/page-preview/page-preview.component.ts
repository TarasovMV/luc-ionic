import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {IPagePreviewCard} from '../../models/page-preview.model';
import {CARDS_SOURCE} from './page-preview.data';
import {IonSlides, NavController} from '@ionic/angular';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'app-page-preview',
    templateUrl: './page-preview.component.html',
    styleUrls: ['./page-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagePreviewComponent implements OnInit {

    @ViewChild('ionSlides') ionSlide: IonSlides;
    private cards$: BehaviorSubject<IPagePreviewCard[]> = new BehaviorSubject<IPagePreviewCard[]>(CARDS_SOURCE);
    public cards: Observable<IPagePreviewCard[]> = this.cards$.asObservable();
    public readonly nextRouteUrl: string = '/user_init';

    constructor(private navCtrl: NavController) {}

    ngOnInit(): void {}

    public async slideDetectChange(): Promise<void> {
        const currentIdx = await this.ionSlide.getActiveIndex();
        const tmpCards = this.cards$.getValue();
        tmpCards.forEach((el, idx) => {
            if (idx === currentIdx) {
                el.isActive = true;
                return;
            }
            el.isActive = false;
        });
        this.cards$.next(tmpCards);
    }

    public async clickNext(): Promise<void> {
        if (this.cards$.getValue()?.slice(-1)[0]?.isActive) {
            await this.routeNext();
        } else {
            await this.slideNext();
        }
    }

    private async slideNext(): Promise<void> {
        await this.ionSlide.slideNext();
    }

    private async routeNext(): Promise<void> {
        await this.navCtrl.navigateRoot(this.nextRouteUrl);
    }
}
