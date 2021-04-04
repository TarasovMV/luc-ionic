import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {UserInfoGender} from '../../models/user-info.model';
import {UserInfoService} from '../../@core/services/user-info.service';

@Component({
    selector: 'app-page-user-init',
    templateUrl: './page-user-init.component.html',
    styleUrls: ['./page-user-init.component.scss'],
})
export class PageUserInitComponent implements OnInit {

    private readonly nextRouteUrl: string = '/pre_favorites';

    constructor(private navCtrl: NavController, private userInfoService: UserInfoService) {
    }

    ngOnInit(): void {
    }

    public async chooseCategory(gender: UserInfoGender): Promise<void> {
        await this.userInfoService.setInitialGender(gender);
        await this.navCtrl.navigateRoot(this.nextRouteUrl);
    }
}
