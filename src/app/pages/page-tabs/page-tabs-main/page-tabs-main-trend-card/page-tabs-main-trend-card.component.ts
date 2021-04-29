import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-tabs-main-trend-card',
    templateUrl: './page-tabs-main-trend-card.component.html',
    styleUrls: ['./page-tabs-main-trend-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsMainTrendCardComponent implements OnInit {
    @Input() data: any;

    constructor() {}

    public ngOnInit(): void {}
}
