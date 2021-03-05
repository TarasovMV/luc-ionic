import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {IPageTab, PageTabType} from '../../models/page-tab.model';

@Component({
    selector: 'app-page-tabs',
    templateUrl: './page-tabs.component.html',
    styleUrls: ['./page-tabs.component.scss'],
})
export class PageTabsComponent implements OnInit {

    public readonly tabs: PageTabType[] = ['search', 'blocks', 'like', 'user'];
    private readonly tabsRouting: {[key in PageTabType]: string} = {
        search: 'main/tabs/main',
        blocks: 'main/tabs/tinder',
        like: 'main/tabs/favorites',
        user: 'main/tabs/user',
    };
    public currentTab: PageTabType = 'search';

    constructor(private navCtrl: NavController) {
    }

    public ngOnInit(): void {
    }

    public selectTab(tab: PageTabType): void {
        this.navCtrl.navigateRoot(this.tabsRouting[tab] ?? this.tabsRouting[this.currentTab]).then();
    }

    routing(event: IPageTab): void {
        this.currentTab = event?.tabName;
    }
}
