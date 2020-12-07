import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {animate, style, transition, trigger} from '@angular/animations';

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
export class PageTabsFavoritesPopupComponent implements OnInit {

    public isInterface$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(private modalController: ModalController) {
    }

    ngOnInit(): void {
    }

    public switchVisible(): void {
        this.isInterface$.next(!this.isInterface$.value);
    }

    public async close(): Promise<void> {
        await this.modalController.dismiss();
    }
}
