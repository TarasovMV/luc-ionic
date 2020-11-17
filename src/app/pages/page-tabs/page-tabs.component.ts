import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-page-tabs',
    templateUrl: './page-tabs.component.html',
    styleUrls: ['./page-tabs.component.scss'],
})
export class PageTabsComponent implements OnInit {

    public readonly tabs: string[] = ['search', 'blocks', 'like', 'user'];
    public currentTab: string = 'search';

    constructor(private navCtrl: NavController) {
    }

    public ngOnInit(): void {
    }

    public selectTab(tab: string): void {
        this.currentTab = tab;
        switch (tab) {
            case 'search':
                this.navCtrl.navigateRoot('main/tabs/main').then();
                break;
            case 'blocks':
                this.navCtrl.navigateRoot('main/tabs/tinder').then();
                break;
            case 'like':
                this.navCtrl.navigateRoot('main/tabs/favorites').then();
                break;
            case 'user':
                this.navCtrl.navigateRoot('main/tabs/user').then();
                break;
            default:
                break;
        }
    }
}
