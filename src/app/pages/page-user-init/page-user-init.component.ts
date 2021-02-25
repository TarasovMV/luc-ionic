import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-page-user-init',
    templateUrl: './page-user-init.component.html',
    styleUrls: ['./page-user-init.component.scss'],
})
export class PageUserInitComponent implements OnInit {

    private readonly nextRouteUrl: string = '/pre_favorites';

    constructor(private navCtrl: NavController) {
    }

    ngOnInit(): void {
    }

    public async chooseCategory(gender: 'male' | 'female'): Promise<void> {
        await this.navCtrl.navigateRoot(this.nextRouteUrl);
    }
}
