import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BehaviorSubject} from "rxjs";

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

    constructor() {}

    ngOnInit(): void {}

    toggleInfo(): void {
        this.isInfo$.next(!this.isInfo$.value);
    }

    private disableInfo(): void {
        this.isInfo$.next(false);
    }
}
