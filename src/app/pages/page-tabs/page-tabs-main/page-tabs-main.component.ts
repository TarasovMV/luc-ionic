import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-tabs-main',
    templateUrl: './page-tabs-main.component.html',
    styleUrls: ['./page-tabs-main.component.scss'],
})
export class PageTabsMainComponent implements OnInit, OnDestroy {

    constructor() {
    }

    ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        console.log('main destroy');
    }

}
