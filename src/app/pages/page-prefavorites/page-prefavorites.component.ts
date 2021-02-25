import {Component, OnInit} from '@angular/core';
import {PagePrefavoritesItemGroup} from './classes/page-prefavorites-item-group.class';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-page-prefavorites',
    templateUrl: './page-prefavorites.component.html',
    styleUrls: ['./page-prefavorites.component.scss'],
})
export class PagePrefavoritesComponent implements OnInit {
    private readonly nextRouteUrl: string = '/main';
    public itemsGroup: PagePrefavoritesItemGroup;

    constructor(private navCtrl: NavController) {
    }

    ngOnInit(): void {
        this.itemsGroup = new PagePrefavoritesItemGroup();
    }

    public async continue(): Promise<void> {
        if (!this.itemsGroup.isValid) {
            return;
        }
        await this.navCtrl.navigateRoot(this.nextRouteUrl);
    }
}
