import {Component, OnInit} from '@angular/core';
import {PagePrefavoritesItemGroup} from './classes/page-prefavorites-item-group.class';
import {NavController} from '@ionic/angular';
import {RecognitionInfoService} from '../../@core/services/recognition-info.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-page-prefavorites',
    templateUrl: './page-prefavorites.component.html',
    styleUrls: ['./page-prefavorites.component.scss'],
})
export class PagePrefavoritesComponent implements OnInit {
    private readonly nextRouteUrl: string = '/main';
    public itemsGroup: PagePrefavoritesItemGroup;
    public isLoad$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(
        private navCtrl: NavController,
        private recognitionInfoService: RecognitionInfoService,
    ) {}

    async ngOnInit(): Promise<void> {
        const items = await this.recognitionInfoService.getStartReco();
        console.log('i', items);
        this.itemsGroup = new PagePrefavoritesItemGroup(items);
        this.isLoad$.next(false);
    }

    public async continue(): Promise<void> {
        if (!this.itemsGroup.isValid) {
            return;
        }
        await this.navCtrl.navigateRoot(this.nextRouteUrl);
    }
}
