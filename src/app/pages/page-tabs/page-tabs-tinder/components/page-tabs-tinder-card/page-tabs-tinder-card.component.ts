import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-page-tabs-tinder-card',
    templateUrl: './page-tabs-tinder-card.component.html',
    styleUrls: ['./page-tabs-tinder-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsTinderCardComponent implements OnInit {

    @Input() private set imgSrc(value: string) {
        this._imgSrc = value;
    }
    _imgSrc: string;

    constructor() {}

    ngOnInit(): void {}
}
