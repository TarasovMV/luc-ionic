import {Component, OnInit} from '@angular/core';
import {PagePrefavoritesItemGroup} from './classes/page-prefavorites-item-group.class';
import {NavController} from '@ionic/angular';
import {RecognitionInfoService} from '../../@core/services/recognition-info.service';
import {BehaviorSubject} from 'rxjs';
import {UserInfoService} from '../../@core/services/user-info.service';
import {ApiFileService} from '../../@core/services/api/api-file.service';

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
        private userInfoService: UserInfoService,
        private recognitionInfoService: RecognitionInfoService,
        private apiFileService: ApiFileService,
    ) {}

    async ngOnInit(): Promise<void> {
        const items = await this.recognitionInfoService.getStartReco();
        items.forEach(x => x.imageUrl = this.apiFileService.getStartRecoPhotoById(x.id));
        this.itemsGroup = new PagePrefavoritesItemGroup(items);
        this.isLoad$.next(false);
    }

    public async continue(): Promise<void> {
        if (!this.itemsGroup.isValid) {
            return;
        }
        this.userInfoService.selectedPreFavourites = this.itemsGroup.activeItems.map(x => ({id: x.id}));
        await this.navCtrl.navigateRoot(this.nextRouteUrl);
    }
}
