import {Component, Input, OnInit} from '@angular/core';
import {IPageTabsMainCard} from '../../../../models/page-tabs-main.model';

@Component({
    selector: 'app-page-tabs-main-recommend-card',
    templateUrl: './page-tabs-main-recommend-card.component.html',
    styleUrls: ['./page-tabs-main-recommend-card.component.scss'],
})
export class PageTabsMainRecommendCardComponent implements OnInit {

    @Input() data: IPageTabsMainCard = null;

    constructor() {
    }

    ngOnInit() {
    }

}
