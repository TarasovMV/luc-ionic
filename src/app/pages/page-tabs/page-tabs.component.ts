import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-tabs',
    templateUrl: './page-tabs.component.html',
    styleUrls: ['./page-tabs.component.scss'],
})
export class PageTabsComponent implements OnInit {

    public readonly tabs: string[] = ['search', 'blocks', 'like', 'user'];
    public currentTab: string = 'search';

    constructor() {
    }

    public ngOnInit(): void {
    }

    public selectTab(tab: string): void {
        this.currentTab = tab;
    }
}
