import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {IPageTab, PageTabType} from '../../models/page-tab.model';
import {BehaviorSubject} from 'rxjs';
import {UserInfoService} from '../../@core/services/user-info.service';

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

    public currentTab$: BehaviorSubject<PageTabType> = new BehaviorSubject<PageTabType>('search');
    public isActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private navCtrl: NavController,
        private userInfoService: UserInfoService,
    ) {}

    async ngOnInit(): Promise<void> {
        await this.userInfoService.init();
        this.isActive$.next(true);
    }

    public selectTab(tab: PageTabType): void {
        this.navCtrl.navigateRoot(this.tabsRouting[tab] ?? this.tabsRouting[this.currentTab$.value]).then();
    }

    public routing(event: IPageTab): void {
        this.currentTab$.next(event?.tabName);
    }
}
